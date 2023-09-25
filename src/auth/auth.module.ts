import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { UserModule } from 'src/user/user.module';
import { SsoController } from './sso.controller';
import { LinkedinService } from './linkedin.service';
import { SignInService } from './sign-in.service';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigurationService],
      useFactory(configService: ConfigurationService) {
        const jwt = configService.get('jwt');

        return {
          global: true,
          secret: jwt.secret,
          signOptions: { expiresIn: jwt.tokenLifespan },
        };
      },
    }),
    HttpModule,
    UserModule,
  ],
  providers: [LinkedinService, SignInService, GoogleStrategy, FacebookStrategy],
  controllers: [SsoController],
})
export class AuthModule {}
