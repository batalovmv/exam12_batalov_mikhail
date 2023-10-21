import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker'


import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { UserRole } from '../../enums/userRole.enum';
import { User } from '../../entities/user.entity';

interface UserParams {
  username?: string;
  password?: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  token?: string;
  role?: 'user' | 'admin';
  // другие необязательные поля
}

export const UserFactory = setSeederFactory(User, async (faker) => {
  const user = new User();

  const username = faker.internet.userName();
  const displayName = faker.internet.userName();
  const email = faker.internet.email();
  const avatar = 'default_avatar.png';
  const password = faker.internet.password();
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = nanoid();
  const role = UserRole.User;

  user.username = username;
  user.displayName = displayName;
  user.email = email;
  user.avatar = avatar;
  user.password = hashedPassword;
  user.token = token;
  user.role = role;

  return user;
});
