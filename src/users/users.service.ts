import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(private readonly entityManager: EntityManager) { }

    async registermerchant(createUserDto: CreateUserDto): Promise<any> {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const query = `call registermerchant(?,?,?,?,?,?,?)`;
            const params = [
                createUserDto.email,
                hashedPassword,
                createUserDto.mobileNumber,
                createUserDto.firstName,
                createUserDto.lastName,
                createUserDto.username,
                2,
            ];
            return await this.entityManager.query(query, params);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }
}
