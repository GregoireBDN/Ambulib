import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/creat-user.dto';

@Injectable()
export class AuthService {
  registerUser(dto: CreateUserDto) {
    return dto;
  }
}
