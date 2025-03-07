import { forwardRef, Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/database/entities/wallet.entity';
import { CryptoWallet } from 'src/database/entities/crypto_wallet.entity';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [
    forwardRef(() => CryptoModule),
    TypeOrmModule.forFeature([Wallet, CryptoWallet])
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule { }
