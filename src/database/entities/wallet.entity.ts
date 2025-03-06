import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CryptoWallet } from "./crypto_wallet.entity";

@Entity({
    name: 'wallet'
})
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => CryptoWallet, (cryptoWallet: CryptoWallet) => cryptoWallet.wallet)
    cryptoWallet: CryptoWallet[];
    
}