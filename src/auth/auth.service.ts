import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EntityManager, Repository } from 'typeorm';
import { LoginDto, LoginResponse } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isPasswordMatch: boolean = await bcrypt.compare(
        password,
        user.password!,
      );
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Password does not match');
      }
      const payload = { id: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
      });
      user.password = undefined;
      return {
        user,
        token,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message || 'Login failed');
    }
  }
}
