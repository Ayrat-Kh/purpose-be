import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';
import { SsoController } from './sso.controller';
import { AuthStrategy } from './auth.strategy';
import { Auth0Service } from './auth0.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      useFactory() {
        return {
          defaultStrategy: 'jwt',
        };
      },
    }),
    HttpModule,
    UserModule,
  ],
  providers: [AuthStrategy, Auth0Service],
  controllers: [SsoController],
})
export class AuthModule {}
