import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  AddUserRoleDto,
  DeleteUserRoleDto,
  GetAllUserRoleDto,
  UpdateUserRoleDto,
} from './dto/user-role.dto';
@Injectable()
export class UserRoleService {
  constructor(private readonly entityManager: EntityManager) {}
  async getAllUserRole(getAllUserRoleDto: GetAllUserRoleDto) {
    try {
      const query = `call userrolegetall(?,?,?,?)`;
      const params = [
        getAllUserRoleDto.start,
        getAllUserRoleDto.limit,
        getAllUserRoleDto.userRole,
        getAllUserRoleDto.restuarent 
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async addUserRole(addUserRoleDto: AddUserRoleDto): Promise<any> {
    try {
      const query = `call userroleaddone(?,?,?,?)`;
      const params = [
        addUserRoleDto.userRole,
        addUserRoleDto.status,
        addUserRoleDto.createdBy,
        addUserRoleDto.restuarent
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getSingleUserRole(id: number): Promise<any> {
    try {
      const query = `call userrolegetone(?)`;
      const params = [id];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteSingleUserRole(
    id: number,
    deleteUserRoleDto: DeleteUserRoleDto,
  ): Promise<any> {
    try {
      const query = `call userroledeleteone(?,?)`;
      const params = [id, deleteUserRoleDto.updatedBy];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateUserRole(id: number, updateUserRoleDto: UpdateUserRoleDto): Promise<any> {
    try {
      const query = `call userroleupdateone(?,?,?,?)`;
      const params = [
        id,
        updateUserRoleDto.userRole,
        updateUserRoleDto.status,
        updateUserRoleDto.updatedBy,
        updateUserRoleDto.restuarent
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
