import { JsonController, Authorized, Post, Param, Get, Body, Delete, HttpError, CurrentUser } from 'routing-controllers';
import { Establishment } from '../entities/establishment.entity';
import { CreateEstablishmentDto } from '../dto/DTO';
import { EstablishmentRepository } from '../repositories/Establishment.repository';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { ImageRepository } from '../repositories/Image.repository';
import { ReviewRepository } from '../repositories/Review.repository';


@JsonController('/establishments')
export class EstablishmentController {

  @Authorized('user')
  @Post('/')
  async create(@CurrentUser() user: User, @Body() establishmentData: CreateEstablishmentDto) {
    const newEstablishment = new Establishment();
    newEstablishment.name = establishmentData.name;
    newEstablishment.description = establishmentData.description;

    if (!user) {
      throw new Error('User not found');
    }

    newEstablishment.user = user;

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
    const establishment = await EstablishmentRepository.findOne({ where: { id }, relations: ["images", "reviews"] });

    if (!establishment) throw new HttpError(404, "Establishment not found");

    await ImageRepository.remove(establishment.images);
    await ReviewRepository.remove(establishment.reviews);
    await EstablishmentRepository.remove(establishment);

    return { message: 'Establishment deleted successfully' };
  }
}