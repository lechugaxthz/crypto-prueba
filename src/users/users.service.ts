import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/database/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    private dataSource: DataSource,
    @Inject(forwardRef((() => AuthService)))
    private authService: AuthService,
    @InjectRepository(User)
    private userModel: Repository<User>
  ) { }

  async create(user: any) {
    const hashedPassword = await this.authService.hashPass(user.password)

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newUser = this.userModel.create({
        user: user.user,
        password: hashedPassword
      })
      await this.userModel.save(newUser)
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException('No se pudo crear al usuario.', { cause: error.message })
    } finally {
      await queryRunner.release();
    }
  }

  async findToAuth(user: string) {
    return await this.userModel.findOne({ where: { user } })
  }

}
