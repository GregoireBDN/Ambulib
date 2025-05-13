import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { verify } from 'argon2';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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
}
