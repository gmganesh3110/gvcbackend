import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
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

  @Get('getall')
  async getAllUserRole(
    @Query() getAllUserRoleDto: GetAllTablesDto,
  ): Promise<any> {
    return await this.tablesService.getAllTables(getAllUserRoleDto);
  }

  @Post('add')
  async addUserRole(@Body() addUserRoleDto: AddTableDto): Promise<any> {
    return await this.tablesService.addTable(addUserRoleDto);
  }

  @Get('getone/:id')
  async getSingleUserRole(@Param('id') id: number): Promise<any> {
    return await this.tablesService.getSingleTable(id);
  }

  @Post('delete')
  async deleteSingleUserRole(
    @Body() deleteUserRoleDto: DeleteTableDto,
  ): Promise<any> {
    return await this.tablesService.deleteTable(deleteUserRoleDto);
  }

  @Put('update/:id')
  async updateUserRole(
    @Param('id') id: number,
    @Body() updateUserRoleDto: UpdateTableDto,
  ): Promise<any> {
    return await this.tablesService.updateTable({ ...updateUserRoleDto, id });
  }
}
