import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { hash, verify } from 'argon2';
import type { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';
import { Role, AuthProvider } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    this.logger.log(`Registering new user with email: ${createUserDto.email}`);

    try {
      const user = await this.userService.findByEmail(createUserDto.email);

      if (user) {
        this.logger.warn(
          `Registration failed: User with email ${createUserDto.email} already exists`,
        );
        throw new ConflictException('User already exists!');
      }

      // Pour l'inscription classique, on marque le profil comme complet
      const newUser = await this.userService.create({
        ...createUserDto,
        authProvider: AuthProvider.CREDENTIALS,
        isProfileComplete: true,
      });

      this.logger.log(`User created successfully with ID: ${newUser.id}`);

      // Connecter automatiquement l'utilisateur après l'inscription
      const loginResult = await this.login(
        newUser.id,
        newUser.firstName,
        newUser.lastName,
        newUser.role,
        newUser.isProfileComplete,
      );

      this.logger.log(
        `User ${newUser.id} logged in successfully after registration`,
      );
      return loginResult;
    } catch (error) {
      this.logger.error(
        `Error in registerUser for email ${createUserDto.email}:`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    if (!user.password)
      throw new UnauthorizedException('Invalid user configuration!');

    const isPasswordMatched = await verify(user.password, password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid Credentials!');

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
    };
  }

  async login(
    userId: number,
    firstName: string,
    lastName: string,
    role: Role,
    isProfileComplete: boolean,
  ) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRT = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRT);
    return {
      id: userId,
      firstName,
      lastName,
      role,
      isProfileComplete,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    const currentUser = {
      id: user.id,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
    };
    return currentUser;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOneInternal(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    if (!user.hashedRefreshToken)
      throw new UnauthorizedException('No refresh token found!');

    const refreshTokenMatched = await verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid Refresh Token!');
    const currentUser = {
      id: user.id,
      isProfileComplete: user.isProfileComplete,
    };
    return currentUser;
  }

  async refreshToken(
    userId: number,
    firstName: string,
    lastName: string,
    isProfileComplete: boolean,
  ) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRT = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRT);
    return {
      id: userId,
      firstName,
      lastName,
      isProfileComplete,
      accessToken,
      refreshToken,
    };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;

    // Pour Google, on marque le profil comme incomplet
    return await this.userService.create({
      ...googleUser,
      authProvider: AuthProvider.GOOGLE,
      isProfileComplete: false,
    });
  }

  async completeProfile(userId: number, profileData: Partial<CreateUserDto>) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    const { age, ...restProfileData } = profileData;
    const updateData = {
      ...restProfileData,
      age: age ? (typeof age === 'string' ? parseInt(age) : age) : undefined,
      isProfileComplete: true,
    };

    return this.userService.update(userId, updateData);
  }

  async signOut(userId: number) {
    return await this.userService.updateHashedRefreshToken(userId, null);
  }
}
