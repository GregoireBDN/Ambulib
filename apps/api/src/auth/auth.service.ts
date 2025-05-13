import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayloat';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}
  /**
   * Register a new user
   * @param dto - The user data
   * @returns The created user
   * @throws ConflictException if the user already exists
   */
  async registerUser(dto: CreateUserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return this.userService.create(dto);
  }

  /**
   * Validate a local user
   * @param email - The user's email
   * @param password - The user's password
   * @returns The validated user
   * @throws UnauthorizedException if the user is not found or the password is invalid
   */
  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!(await verify(user.password, password))) {
      throw new UnauthorizedException('Invalid password');
    }
    return { id: user.id, name: user.name };
  }

  /**
   * Login a user
   * @param userId - The user's ID
   * @param name - The user's name
   * @returns The user's ID, name, and access token
   */
  async login(userId: number, name?: string) {
    const { accessToken, refreshToken } = await this.generateToken(userId);
    return { id: userId, name: name, accessToken, refreshToken };
  }

  /**
   * Generate a token for a user
   * @param userId - The user's ID
   * @returns The access token
   */
  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return { accessToken, refreshToken };
  }

  /**
   * Validate a JWT token
   * @param userId - The user's ID
   * @returns The user's ID
   * @throws UnauthorizedException if the user is not found
   */
  async validateJwtToken(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return currentUser;
  }

  /**
   * Validate a refresh token
   * @param userId - The user's ID
   * @returns The user's ID
   */
  async validateRefreshToken(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const currentUser = {
      id: user.id,
    };
    return currentUser;
  }

  /**
   * Refresh a token
   * @param userId - The user's ID
   * @returns The new access token and refresh token
   */
  async refreshToken(userId: number, name?: string) {
    const { accessToken, refreshToken } = await this.generateToken(userId);
    return { id: userId, name: name, accessToken, refreshToken };
  }
}
