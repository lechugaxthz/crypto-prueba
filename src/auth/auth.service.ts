import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt, compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        @Inject(forwardRef(() => JwtService))
        private readonly jwtService: JwtService,
    ) { }
    private async validatePasswordUser(user: { user: string, password: string }): Promise<any> {
        try {
            const thisUser = await this.userService.findToAuth(user.user)
            if (!thisUser) throw new BadRequestException('Usuario no encontrado')

            if (!(await this.comparePass(user.password, thisUser.password)).valueOf()) throw new BadRequestException('Contraseña incorrecta.')

            return { id: thisUser.id, user: thisUser.user }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async hashPass(password: string): Promise<string> {
        const salt = await genSalt(10)
        return await hash(password, salt)
    }

    async comparePass(password: string, userPassword: string): Promise<Boolean> {
        return await compare(password, userPassword)
    }

    async signIn(user: any): Promise<{ access_token: string }> {
        const thisUser = await this.validatePasswordUser(user)
        return { access_token: await this.jwtService.signAsync({ sub: thisUser.id, user: thisUser.user }) }
    }

    async signUp(user: any) {
        return await this.userService.create(user)
    }
}
