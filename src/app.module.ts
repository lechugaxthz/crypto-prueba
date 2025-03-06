import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';
import { CryptoWallet } from './database/entities/crypto_wallet.entity';
import { Wallet } from './database/entities/wallet.entity';
import { Crypto } from './database/entities/crypto.entity';
import { User } from './database/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from './wallet/wallet.controller';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_ṔORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [
        User,
        Crypto,
        Wallet,
        CryptoWallet,
      ]
    }),
    UsersModule,
    CryptoModule,
    AuthModule,
    WalletModule
  ],
  controllers: [WalletController]
})
export class AppModule { }
