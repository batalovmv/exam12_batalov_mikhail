import { AppDataSource } from '../data-source';
import { Image } from '../entities/image.entity';

export const ImageRepository = AppDataSource.getRepository(Image);