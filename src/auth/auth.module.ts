import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SsoController } from './sso.controller';
import { LinkedinService } from './linkedin.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationService } from 'src/configuration/configuration.service';

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
  providers: [LinkedinService],
  controllers: [SsoController],
})
export class AuthModule {}
