import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import {
  AddTableDto,
  DeleteTableDto,
  GetAllTablesDto,
  UpdateTableDto,
} from './dto/table.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post('getall')
  async getAllUserRole(
    @Body() getAllUserRoleDto: GetAllTablesDto,
  ): Promise<any> {
    return await this.tablesService.getAllTables(getAllUserRoleDto);
  }

  @Post('add')
  async addUserRole(@Body() addUserRoleDto: AddTableDto): Promise<any> {
    return await this.tablesService.addTable(addUserRoleDto);
  }

  @Post('getone')
  async getSingleUserRole(@Body() id: any): Promise<any> {
    return await this.tablesService.getSingleTable(id.id);
  }

  @Post('delete')
  async deleteSingleUserRole(
    @Body() deleteUserRoleDto: DeleteTableDto,
  ): Promise<any> {
    return await this.tablesService.deleteTable(deleteUserRoleDto);
  }

  @Post('update')
  async updateUserRole(
    @Body() updateUserRoleDto: UpdateTableDto,
  ): Promise<any> {
    return await this.tablesService.updateTable(updateUserRoleDto);
  }
}
