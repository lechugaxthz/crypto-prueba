import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  create(createCryptoDto) {
    return 'This action adds a new crypto';
  }

  findAll() {
    return `This action returns all crypto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crypto`;
  }

  update(id: number, updateCryptoDto) {
    return `This action updates a #${id} crypto`;
  }

  remove(id: number) {
    return `This action removes a #${id} crypto`;
  }
}
