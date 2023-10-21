import { JsonController, Authorized, Post, Param, Get, Delete, UploadedFile, HttpError, Body, CurrentUser } from 'routing-controllers';
import multer from 'multer';
import { ImageRepository } from '../repositories/Image.repository';
import { Image } from '../entities/image.entity';
import { CreateImageDto } from '../dto/DTO';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { EstablishmentRepository } from '../repositories/Establishment.repository';
const upload = multer({ dest: 'uploads/' });

  @JsonController('/images')
  export class ImageController {

    @Authorized('user')
    @Post('/')
    async create(
      @CurrentUser() user: User,
      @UploadedFile('image', { options: upload }) file: any,
      @Body() imageData: CreateImageDto,
      @Body() establishmentId: string   
    ) {
      const newImage = new Image();
      newImage.url = file.path;

    
      const establishmentIdNum = parseInt(establishmentId, 10);
      if (isNaN(establishmentIdNum)) {
        throw new Error('Invalid establishmentId');
      }
      const establishment = await EstablishmentRepository.findOne({ where: { id: establishmentIdNum } });

      if (!user || !establishment) {
        throw new Error('User or Establishment not found');
      }

      newImage.user = user;
      newImage.establishment = establishment; 

      await ImageRepository.save(newImage);

      return newImage;
    }

    @Get('/:id')
    async get(@Param('id') id: number) {
      const image = await ImageRepository.findOne({ where: { id } });

      if (!image) throw new HttpError(404, "Image not found");

      return image;
    }

    @Authorized('admin')
    @Delete('/:id')
    async delete(@Param('id') id: number) {
      const image = await ImageRepository.findOne({ where: { id } });

      if (!image) throw new HttpError(404, "Image not found");

      await ImageRepository.remove(image);

      return { message: 'Image deleted successfully' };
    }
  }