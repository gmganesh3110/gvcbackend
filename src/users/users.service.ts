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

    async getall(body: any): Promise<any> {
        try {
            const { start, limit, restuarent } = body;
            const query = `call getallusers(?,?,?)`;
            const params = [start, limit, restuarent];
            const [data, total] = await this.entityManager.query(query, params);
            return { data, total };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    async add(body: any): Promise<any> {
        try {
            const query = `call adduser(?,?,?,?,?,?,?)`;
            const params = [body.username, body.email, body.firstName, body.lastName, body.mobileNumber, body.userRole, body.restuarent];
            return await this.entityManager.query(query, params);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }   

    async getone(id: number): Promise<any> {
        try {
            const query = `call getoneuser(?)`;
            const params = [id];
            return await this.entityManager.query(query, params);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: number, body: any): Promise<any> {
        try {
            const query = `call updateuser(?,?,?,?,?,?,?)`;
            const params = [id, body.username, body.email, body.firstName, body.lastName, body.mobileNumber, body.userRole, body.restuarent];
            return await this.entityManager.query(query, params);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const query = `call deleteuser(?)`;
            const params = [id];
            return await this.entityManager.query(query, params);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error.message);
        }
    }
}
