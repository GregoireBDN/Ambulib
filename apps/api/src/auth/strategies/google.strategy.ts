import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Profile,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';
import googleOAuthConfig from '../config/google-oauth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOAuthConfig.KEY)
    private readonly config: ConfigType<typeof googleOAuthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackUrl,
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      if (!profile.emails?.[0]?.value) {
        throw new Error('No email provided by Google');
      }

      const user = await this.authService.validateGoogleUser({
        email: profile.emails[0].value,
        firstName: profile.name?.givenName ?? '',
        lastName: profile.name?.familyName ?? '',
        password: '',
      });

      done(null, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
      });
      return user;
    } catch (error) {
      done(error, undefined);
      return undefined;
    }
  }
}
