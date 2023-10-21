import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Review } from "../../entities/review.entity";

export const ReviewFactory = setSeederFactory(Review, (faker: Faker) => {
  const review = new Review();

  review.qualityRating = faker.number.int({ min: 1, max: 5 });
  review.serviceRating = faker.number.int({ min: 1, max: 5 });
  review.environmentRating = faker.number.int({ min: 1, max: 5 });

  return review;
});