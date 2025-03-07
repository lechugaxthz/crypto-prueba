import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }

  @Post()
  create(@Body() createCryptoDto) {
    return this.cryptoService.create(createCryptoDto);
  }

  @Get()
  findAll(@Query('cant') cant: number, @Query('page') page: number) {
    return this.cryptoService.paginatedAll({ cant, page });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrypto) {
    return this.cryptoService.update({ id, ...updateCrypto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoService.remove(id);
  }
}
