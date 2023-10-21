import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Image } from '../../entities/image.entity';

export const ImageFactory = setSeederFactory(Image, (faker: Faker) => {
  const image = new Image();

  image.url = faker.image.imageUrl();

  return image;
});