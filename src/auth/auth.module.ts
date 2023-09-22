import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

import { SsoController } from './sso.controller';
import { LinkedinService } from './linkedin.service';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { SignInService } from './sign-in.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
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
  ],
  providers: [LinkedinService, SignInService, GoogleStrategy],
  controllers: [SsoController],
})
export class AuthModule {}
