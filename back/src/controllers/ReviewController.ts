import { JsonController, Authorized, Post, Param, Get, Body, Delete, HttpError } from 'routing-controllers';
import { CreateReviewDto } from '../dto/DTO';
import { Review } from '../entities/review.entity';
import { ReviewRepository } from '../repositories/Review.repository';


@JsonController('/reviews')
export class ReviewController {

  @Authorized('user')
  @Post('/')
  async create(@Body() reviewData: CreateReviewDto) {
    const newReview = new Review();
    newReview.qualityRating = reviewData.qualityRating;
    newReview.serviceRating = reviewData.serviceRating;
    newReview.environmentRating = reviewData.environmentRating;
    newReview.comment = reviewData.comment;

    await ReviewRepository.save(newReview);

    return newReview;
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    const review = await ReviewRepository.findOne({ where: { id } });

    if (!review) throw new HttpError(404, "Review not found");

    return review;
  }

  @Authorized('admin')
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const review = await ReviewRepository.findOne({ where: { id } });

    if (!review) throw new HttpError(404, "Review not found");

    await ReviewRepository.remove(review);

    return { message: 'Review deleted successfully' };
  }
}