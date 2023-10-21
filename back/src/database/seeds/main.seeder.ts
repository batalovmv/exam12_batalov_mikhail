import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entities/user.entity';
import { Image } from '../../entities/image.entity';
import { Establishment } from '../../entities/establishment.entity';
import { Review } from '../../entities/review.entity';



export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const establishmentRepository = dataSource.getRepository(Establishment);
    const imageRepository = dataSource.getRepository(Image);
    const reviewRepository = dataSource.getRepository(Review);

    const userFactory = factoryManager.get(User);
    const establishmentFactory = factoryManager.get(Establishment);
    const imageFactory = factoryManager.get(Image);
    const reviewFactory = factoryManager.get(Review);

    const users = await userFactory.saveMany(10);

    for (const user of users) {
      const establishments = await establishmentFactory.saveMany(3, { user });
      for (const establishment of establishments) {
        const images = await imageFactory.saveMany(5, { user, establishment });
        const reviews = await reviewFactory.saveMany(3, { user, establishment });
        await imageRepository.save(images);
        await reviewRepository.save(reviews);
      }
    }
  }
}