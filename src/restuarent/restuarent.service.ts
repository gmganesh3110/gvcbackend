import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateRestuarentDto, CreateRestuarentDto } from './dto/restuarent.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class RestuarentService {
  constructor(private readonly entityManager: EntityManager) {}
  async create(createRestuarentDto: CreateRestuarentDto) {
    try {
      const {
        name,
        description,
        city,
        state,
        country,
        address,
        phone,
        email,
        website,
        logo,
        banner,
        createdBy,
      } = createRestuarentDto;
      const query = `call restuarentcreate(?,?,?,?,?,?,?,?,?,?,?,?)`;
      const params = [
        name,
        description,
        city,
        state,
        country,
        address,
        phone,
        email,
        website,
        logo,
        banner,
        createdBy,
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  findAll() {
    return `This action returns all restuarent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restuarent`;
  }

  update(id: number, updateRestuarentDto: UpdateRestuarentDto) {
    return `This action updates a #${id} restuarent`;
  }

  remove(id: number) {
    return `This action removes a #${id} restuarent`;
  }
}
