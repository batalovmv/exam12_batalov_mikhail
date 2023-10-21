import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entities/user.entity';
import { Cocktail } from '../../entities/cocktail.entity';
import { Ingredient } from '../../entities/ingredient.entity';
import { Rating } from '../../entities/rating.entity';



export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const cocktailRepository = dataSource.getRepository(Cocktail);
    const ingredientRepository = dataSource.getRepository(Ingredient);
    const ratingRepository = dataSource.getRepository(Rating);

    const userFactory = factoryManager.get(User);
    const cocktailFactory = factoryManager.get(Cocktail);
    const ingredientFactory = factoryManager.get(Ingredient);
    const ratingFactory = factoryManager.get(Rating);

    const users = await userFactory.saveMany(10);

    for (const user of users) {
      const cocktails = await cocktailFactory.saveMany(3, { user });
      for (const cocktail of cocktails) {
        const ingredients = await ingredientFactory.saveMany(5, { cocktail });
        await ingredientRepository.save(ingredients);
        const ratings = await ratingFactory.saveMany(3, { user, cocktail });
        await ratingRepository.save(ratings);
      }
    }
  }
}