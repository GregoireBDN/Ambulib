import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  Patch,
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
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    isProfileComplete: boolean;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    console.log('Signup request received:', createUserDto);
    try {
      console.log('Calling authService.registerUser...');
      const result = this.authService.registerUser(createUserDto);
      console.log('Signup successful:', result);
      return result;
    } catch (error) {
      console.error('Signup error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      throw error;
    }
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
      req.user.isProfileComplete,
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
      req.user.isProfileComplete,
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
    try {
      const response = await this.authService.login(
        req.user.id,
        req.user.firstName,
        req.user.lastName,
        req.user.role,
        req.user.isProfileComplete,
      );

      const redirectUrl = new URL(
        'http://localhost:3000/api/auth/google/callback',
      );
      redirectUrl.searchParams.append('userId', response.id.toString());
      redirectUrl.searchParams.append('firstName', response.firstName);
      redirectUrl.searchParams.append('lastName', response.lastName);
      redirectUrl.searchParams.append('email', req.user.email);
      redirectUrl.searchParams.append('accessToken', response.accessToken);
      redirectUrl.searchParams.append('refreshToken', response.refreshToken);
      redirectUrl.searchParams.append('role', response.role.toString());
      redirectUrl.searchParams.append(
        'isProfileComplete',
        response.isProfileComplete.toString(),
      );

      res.redirect(redirectUrl.toString());
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect(
        'http://localhost:3000/auth/signin?error=google_auth_failed',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('complete-profile')
  completeProfile(
    @Request() req: RequestWithUser,
    @Body() profileData: Partial<CreateUserDto>,
  ) {
    return this.authService.completeProfile(req.user.id, profileData);
  }

  @Post('signout')
  signOut(@Req() req: RequestWithUser) {
    return this.authService.signOut(req.user.id);
  }
}
