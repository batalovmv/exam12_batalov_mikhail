import { JsonController, Authorized, Post, Param, Get, Delete, UploadedFile, HttpError } from 'routing-controllers';
import multer from 'multer';
import { ImageRepository } from '../repositories/Image.repository';
import { Image } from '../entities/image.entity';
const upload = multer({ dest: 'uploads/' });

@JsonController('/images')
export class ImageController {

  @Authorized('user')
  @Post('/')
  async create(@UploadedFile('image', { options: upload }) file: any) {
    const newImage = new Image();
    newImage.url = file.path;
    
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