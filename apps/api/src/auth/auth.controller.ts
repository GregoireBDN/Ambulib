import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { Role } from '@prisma/client';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

interface RequestWithUser extends Request {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req: RequestWithUser) {
    return this.authService.login(
      req.user.id,
      req.user.firstName,
      req.user.lastName,
      req.user.role,
    );
  }

  @Roles('ADMIN', 'DRIVER')
  @Get('protected')
  getAll(@Request() req: RequestWithUser) {
    return {
      message: `Now you can access this protected API. this is your user ID: ${req.user.id}`,
    };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: RequestWithUser) {
    return this.authService.refreshToken(
      req.user.id,
      req.user.firstName,
      req.user.lastName,
    );
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req: RequestWithUser, @Res() res: Response) {
    const response = await this.authService.login(
      req.user.id,
      req.user.firstName,
      req.user.lastName,
      req.user.role,
    );
    const redirectUrl = new URL(
      'http://localhost:3002/api/auth/google/callback',
    );
    redirectUrl.searchParams.append('userId', response.id.toString());
    redirectUrl.searchParams.append('firstName', response.firstName);
    redirectUrl.searchParams.append('lastName', response.lastName);
    redirectUrl.searchParams.append('email', req.user.email);
    redirectUrl.searchParams.append('accessToken', response.accessToken);
    redirectUrl.searchParams.append('refreshToken', response.refreshToken);
    redirectUrl.searchParams.append('role', response.role);

    res.redirect(redirectUrl.toString());
  }

  @Post('signout')
  signOut(@Req() req: RequestWithUser) {
    return this.authService.signOut(req.user.id);
  }
}
