import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Inject } from '@nestjs/common';
import refreshConfig from '../config/refresh.config';
import { Request } from 'express';

interface RequestWithBody extends Request {
  body: {
    refreshToken: string;
  };
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
    private readonly authService: AuthService,
  ) {
    if (!refreshTokenConfig.secret) {
      throw new Error('JWT secret is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: refreshTokenConfig.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: RequestWithBody, payload: AuthJwtPayload) {
    const userId = payload.sub;
    const refreshToken = req.body?.refreshToken;
    if (!refreshToken) {
      throw new Error('Refresh token not found in request body');
    }
    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
