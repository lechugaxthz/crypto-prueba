import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Crypto } from "./crypto.entity";
import { Wallet } from "./wallet.entity";

@Entity({
    name: 'cryptoWallet'
})
export class CryptoWallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, default: 0 })
    amount: number;

    @ManyToOne(() => Crypto, (crypto: Crypto) => crypto.cryptoWallet)
    crypto: Crypto;

    @ManyToOne(() => Wallet, (wallet: Wallet) => wallet.cryptoWallet)
    wallet: Wallet;
}