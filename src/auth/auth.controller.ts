import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('signIn')
    async signIn(@Body() user: any) {
        return await this.authService.signIn(user);
    }

    @Post('signUp')
    async signUp(@Body() user: any) {
        return await this.authService.signUp(user);
    }
}
