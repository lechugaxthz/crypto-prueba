import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
        /* audience: process.env.APP_URL */ /* de tener un front */
      }
    })),
    forwardRef(() => PassportModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
