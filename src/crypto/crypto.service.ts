import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from 'src/database/entities/crypto.entity';

@Injectable()
export class CryptoService {
  constructor(
    private dataSource: DataSource,
    @Inject(forwardRef(() => WalletService))
    private walletService: WalletService,
    @InjectRepository(Crypto)
    private cryptoModel: Repository<Crypto>,
  ) { }

  async create(crypto: Crypto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newCrypto = this.cryptoModel.create(crypto);
      await this.walletService.createCryptoWalletOnNewCrypto(newCrypto);
      await this.cryptoModel.save(newCrypto);
      await queryRunner.commitTransaction()
      return { message: 'Datos de Crypto subidos con exito.' }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException('No se pudo subir los datos de la crypto.', { cause: error.message })
    } finally {
      await queryRunner.release()
    }
  }

  async paginatedAll({ cant, page }) {
    const [cryptos, count] = await this.cryptoModel.findAndCount({
      order: { 'buyPrice': 'DESC' },
      take: cant,
      skip: cant * (page - 1)
    });
    return {
      cryptos,
      count,
      page,
      pages: Math.ceil(count / cant)
    };
  }

  /* funcion creada para usar en otro servicio */
  async findAll() {
    return await this.cryptoModel.find();
  }

  async update(newDataCrypto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const crypto = await this.cryptoModel.findOne(newDataCrypto.id)

      if (!crypto) throw new BadRequestException('No se encontro la crypto a actualizar.')

      await this.cryptoModel.update(newDataCrypto.id, newDataCrypto)
      await queryRunner.commitTransaction()
      return { message: 'Crypto actualizada con exito.' }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException('No se pudo actualizar la crypto.', { cause: error.message })
    } finally {
      await queryRunner.release()
    }
  }

  async remove(id: string) {
    return await this.cryptoModel.delete(id)
      .then((res) => {
        return { message: 'Crypto eliminada con exito.' }
      }).catch((err) => {
        throw new BadRequestException('No se pudo eliminar la crypto.', { cause: err.message })
      });
  }
}
