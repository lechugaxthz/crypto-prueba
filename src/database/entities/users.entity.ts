import { AfterInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Repository } from "typeorm";
import { DataSource } from "typeorm";
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
}