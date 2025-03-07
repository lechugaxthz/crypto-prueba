import { forwardRef, Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from 'src/database/entities/crypto.entity';

@Module({
  imports: [
    forwardRef(() => WalletModule),
    TypeOrmModule.forFeature([Crypto])
  ],
  controllers: [CryptoController],
  providers: [CryptoService],
  exports: [CryptoService]
})
export class CryptoModule { }
