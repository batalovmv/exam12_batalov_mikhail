
import { AppDataSource } from '../data-source';
import { Rating } from '../entities/rating.entity';


export const RatingRepository = AppDataSource.getRepository(Rating);