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
      const query = `CALL authgetloginuser(?)`;
      const params = [email];
      const result = await this.entityManager.query(query, params);
      const user = result[0]?.[0];
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const hashedpassword=await bcrypt.hashSync(password,10);
      const isPasswordMatch: boolean = await bcrypt.compare(
        password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Password does not match');
      }
      const payload = { id: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
      });
      delete user.password;
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
