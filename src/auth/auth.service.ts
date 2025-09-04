import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from 'typeorm';
import { LoginDto, LoginResponse } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    try {
      const { email, password } = loginDto;
      const query = `call authgetloginuser(?)`;
      const params = [email];
      const user = await this.entityManager.query(query, params);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isPasswordMatch: boolean = await bcrypt.compare(
        password,
        user[0][0].password!,
      );
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Password does not match');
      }
      const payload = { user: user[0][0] };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN')
      });
      user[0][0].password = undefined;
      return {
        user: user[0][0],
        token,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message || 'Login failed');
    }
  }
}
