
import { AppDataSource } from '../data-source';
import { Review } from '../entities/review.entity';


export const ReviewRepository = AppDataSource.getRepository(Review);