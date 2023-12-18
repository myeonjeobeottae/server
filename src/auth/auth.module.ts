import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './serializer';
import { AuthProvider } from './auth.provider';
import { DbModule } from 'src/db/db.module';
import { JwtStrategy } from './jwt/jwtStrategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { ShareModule } from 'src/share/share.module';
import { HttpModule } from '@nestjs/axios';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    ShareModule,
    DbModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    ...AuthProvider,
    SessionSerializer,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthRepository],
})
export class AuthModule {}
