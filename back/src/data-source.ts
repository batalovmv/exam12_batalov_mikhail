import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';

import MainSeeder from './database/seeds/main.seeder';
import { Establishment } from './entities/establishment.entity';
import { Review } from './entities/review.entity';
import UserSeeder from './database/seeds/user.seeder';
import { EstablishmentFactory } from './database/factories/enstablishment.factory';
import { ImageFactory } from './database/factories/image.factory';
import { UserFactory } from './database/factories/user.factory';
import { SeederOptions } from 'typeorm-extension';
import { Image } from './entities/image.entity';
import { ReviewFactory } from './database/factories/review.factory';
const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Abc11223344',
  database: 'test',
  entities: [Establishment, Image,Review,User],
  seeds: [UserSeeder,MainSeeder],
  factories: [EstablishmentFactory,ImageFactory,UserFactory,ReviewFactory],
  

  synchronize: true,
};
export const AppDataSource = new DataSource(options);