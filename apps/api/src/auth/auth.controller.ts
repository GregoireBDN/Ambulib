import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  loginUser(
    @Request() req: ExpressRequest & { user: { id: string; name: string } },
  ) {
    return this.authService.login(Number(req.user.id), req.user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(
    @Request() req: ExpressRequest & { user: { id: string; name: string } },
  ) {
    return req.user;
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(
    @Request() req: ExpressRequest & { user: { id: number; name: string } },
  ) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }
}
