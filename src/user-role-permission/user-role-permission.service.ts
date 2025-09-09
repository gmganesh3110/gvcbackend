import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateUserRolePermissionDto,
  GetMenuSubmenuDto,
} from './dto/user-role-permission.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserRolePermissionService {
  constructor(private readonly entityManager: EntityManager) {}

  async getMenuSubmenu(getMenuSubmenuDto: GetMenuSubmenuDto) {
    try {
      const query = `call getmenusubmenu(?,?)`;
      const params = [getMenuSubmenuDto.roleId, getMenuSubmenuDto.restuarent];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async saveUserRolePermission(saveDto: CreateUserRolePermissionDto) {
    try {
      const deleteQuery = `CALL deleteuserrolepermission(?,?)`;
      const deleteParams = [
        saveDto.permissionsToSave[0].userRoleId,
        saveDto.permissionsToSave[0].restuarent,
      ];
      await this.entityManager.query(deleteQuery, deleteParams);
      for (const item of saveDto.permissionsToSave) {
        const query = `CALL saveuserrolepermission(?,?,?,?,?,?,?)`;
        const params = [
          item.menuId,
          item.subMenuId,
          item.createdBy,
          item.updatedBy,
          item.activeStatus,
          item.restuarent,
          item.userRoleId,
        ];
        await this.entityManager.query(query, params);
      }

      return { message: 'User role permission saved successfully' };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
