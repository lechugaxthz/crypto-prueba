import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/database/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UsersService {

  constructor(
    private dataSource: DataSource,
    @Inject(forwardRef((() => AuthService)))
    private authService: AuthService,
    @Inject(forwardRef((() => WalletService)))
    private walletService: WalletService,
    @InjectRepository(User)
    private userModel: Repository<User>
  ) { }

  async create(user: any) {
    const hashedPassword = await this.authService.hashPass(user.password)

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const wallet = await this.walletService.createWallet();

      const newUser = this.userModel.create({
        user: user.user,
        password: hashedPassword,
        wallet
      });

      /* llamo a crear cada crypto wallet con 0 cant por cada crypto existente */
      await this.walletService.createCryptoWallet(wallet);
      await this.userModel.save(newUser);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('No se pudo crear al usuario.' + error.message, { cause: error.message });
    } finally {
      await queryRunner.release();
    }
  }

  async findToAuth(user: string) {
    return await this.userModel.findOne({ where: { user } })
  }

  async findUserById(id: string) {
    return await this.userModel.findOne({
      where: { id },
      select: {
        id: true,
        user: true,
        wallet: {
          id: true,
          cryptoWallet: {
            id: true,
            amount: true,
            crypto: {
              id: true,
              name: true,
              ticker: true,
              buyPrice: true
            }
          }
        }
      },
      relations: ['wallet', 'wallet.cryptoWallet', 'wallet.cryptoWallet.crypto']
    })
  }
}
