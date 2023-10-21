import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Establishment } from '../../entities/establishment.entity';


export const EstablishmentFactory = setSeederFactory(Establishment, (faker: Faker) => {
  const establishment = new Establishment();

  establishment.name = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.department()}`;
  establishment.description = faker.lorem.paragraph();
  

  return establishment;
});