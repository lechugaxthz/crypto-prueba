import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/crypto/crypto.service';
import { Crypto } from 'src/database/entities/crypto.entity';
import { CryptoWallet } from 'src/database/entities/crypto_wallet.entity';
import { Wallet } from 'src/database/entities/wallet.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WalletService {
    constructor(
        private dataSource: DataSource,
        @Inject(forwardRef(() => CryptoService))
        private cryptoService: CryptoService,
        @InjectRepository(Wallet)
        private walletModel: Repository<Wallet>,
        @InjectRepository(CryptoWallet)
        private cryptoWalletModel: Repository<CryptoWallet>

    ) { }

    /* funcion con fin de ser usada en otro servicio. */
    async createWallet() {
        const newWallet = this.walletModel.create();
        await this.walletModel.save(newWallet);
        return newWallet;
    }

    /* funcion con fin de ser usada en otro servicio. */
    async createCryptoWallet(wallet: Wallet) {
        const cryptos = await this.cryptoService.findAll();
        if (cryptos.length) {
            const cryptoWallets = cryptos.map(crypto => {
                const newCryptoWallet = this.cryptoWalletModel.create({
                    wallet,
                    crypto
                });
                return newCryptoWallet;
            });
            await this.dataSource.manager.save(cryptoWallets);
        }
        return;
    }

    /* funcion para ser usada en otro servicio. on create new Crypto */
    async createCryptoWalletOnNewCrypto(crypto: Crypto) {
        const wallets = await this.walletModel.find();
        const cryptoWallets = wallets.map(wallet => {
            const newCryptoWallet = this.cryptoWalletModel.create({
                wallet,
                crypto
            });
            return newCryptoWallet;
        });
        await this.cryptoWalletModel.save(cryptoWallets);
        return;
    }

    async updateCryptoWallet(id: string, amount: number) {
        await this.cryptoWalletModel.update(id, { amount });
        return;
    }
}
