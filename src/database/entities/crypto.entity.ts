import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CryptoWallet } from "./crypto_wallet.entity";

@Entity({
    name: 'crypto'
})
export class Crypto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false, unique: true })
    ticker: string;

    @Column({ nullable: false })
    buyPrice: number;

    @OneToMany(() => CryptoWallet, (cryptoWallet: CryptoWallet) => cryptoWallet.crypto)
    cryptoWallet: CryptoWallet[];

}