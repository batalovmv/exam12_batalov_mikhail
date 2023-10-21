import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { User } from '../../entities/user.entity';
import { UserRole } from '../../enums/userRole.enum';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(User);
    const userFactory = await factoryManager.get(User);

    // Хешируем пароли прямо в сидере
    const adminHashedPassword = await bcrypt.hash('admin', 10);
    const userHashedPassword = await bcrypt.hash('user', 10);

    // Добавляем админа
    await repository.insert([
      {
        username: 'admin',
        displayName: 'Admin Name',
        email: 'admin@example.com',
        avatar: 'default_avatar.png',
        password: adminHashedPassword,
        role: UserRole.Admin,
        token: nanoid()
      },
      // Добавляем пользователя
      {
        username: 'user',
        displayName: 'User Name',
        email: 'user@example.com',
        avatar: 'default_avatar.png',
        password: userHashedPassword,
        role: UserRole.User,
        token: nanoid()
      }
    ]);
  }
}
