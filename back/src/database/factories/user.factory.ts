import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { User } from '../../entities/user.entity';


export const UserFactory = setSeederFactory(User, async (faker: Faker) => {
  const user = new User();

  const password = faker.internet.password();
  const hashedPassword = await bcrypt.hash(password, 10);

  user.username = faker.internet.userName();
  user.password = hashedPassword;
  user.role =  'user'
  user.token = nanoid();

  return user;
});