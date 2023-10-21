import { setSeederFactory } from "typeorm-extension";
import { Rating } from "../../entities/rating.entity";

export const RatingFactory = setSeederFactory(Rating, (faker) => {
  const rating = new Rating();

  rating.rating = faker.number.int({ min: 1, max: 5 });

  return rating;
});