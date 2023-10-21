import { JsonController, Authorized, Post, Param, Get, Body, Delete, HttpError } from 'routing-controllers';
import { Establishment } from '../entities/establishment.entity';
import { CreateEstablishmentDto } from '../dto/DTO';
import { EstablishmentRepository } from '../repositories/Establishment.repository';


@JsonController('/establishments')
export class EstablishmentController {

  @Authorized('user')
  @Post('/')
  async create(@Body() establishmentData: CreateEstablishmentDto) {
    const newEstablishment = new Establishment();
    newEstablishment.name = establishmentData.name;
    newEstablishment.description = establishmentData.description;

    await EstablishmentRepository.save(newEstablishment);

    return newEstablishment;
  }
  @Get('/')
  async getAll() {
    const establishments = await EstablishmentRepository.find({
      relations: ['user', 'reviews', 'images']
    });

    return establishments;
  }
  @Get('/:id')
  async get(@Param('id') id: number) {
    const establishment = await EstablishmentRepository.findOne({ where: { id } });

    if (!establishment) throw new HttpError(404, "Establishment not found");

    return establishment;
  }

  @Authorized('admin')
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const establishment = await EstablishmentRepository.findOne({ where: { id } });


    if (!establishment) throw new HttpError(404, "Establishment not found");

    await EstablishmentRepository.remove(establishment);

    return { message: 'Establishment deleted successfully' };
  }
}