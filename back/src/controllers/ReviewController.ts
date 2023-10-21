import { JsonController, Authorized, Post, Param, Get, Body, Delete, HttpError } from 'routing-controllers';
import { CreateReviewDto } from '../dto/DTO';
import { Review } from '../entities/review.entity';
import { ReviewRepository } from '../repositories/Review.repository';
import { UserRepository } from '../repositories/user.repository';
import { EstablishmentRepository } from '../repositories/Establishment.repository';


@JsonController('/reviews')
export class ReviewController {

  @Authorized('user')
  @Post('/')
  async create(@Body() reviewData: CreateReviewDto) {
    const user = await UserRepository.findOne({ where: { id: reviewData.userId } });
    const establishment = await EstablishmentRepository.findOne({ where: { id: reviewData.establishmentId } });

    if (!user || !establishment) {
      throw new HttpError(404, "User or Establishment not found");
    }

    const newReview = new Review();
    newReview.qualityRating = reviewData.qualityRating;
    newReview.serviceRating = reviewData.serviceRating;
    newReview.environmentRating = reviewData.environmentRating;
    newReview.comment = reviewData.comment;
    newReview.user = user;
    newReview.establishment = establishment;

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

    const reviewId = review.id;

    await ReviewRepository.remove(review);

    return { id: reviewId };
  }
}