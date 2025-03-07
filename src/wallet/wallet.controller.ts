import { Body, Controller, Put } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(
        private readonly walletService: WalletService
    ) { }

    @Put()
    async updateCryptoWallet(@Body() { id, amount }: { id: string, amount: number }) {
        return await this.walletService.updateCryptoWallet(id, amount);
    }

}
