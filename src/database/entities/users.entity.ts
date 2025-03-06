import { AfterInsert, Column, DataSource, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity({
    name: 'user',
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    user: string;

    @Column({ nullable: false })
    password: string

    @OneToOne(() => Wallet)
    @JoinColumn()
    wallet: Wallet;

    @AfterInsert()
    async addWalletAndCrypto() {
        this.wallet = new Wallet()
        
    }
}