
import { AppDataSource } from '../data-source';
import { Cocktail } from '../entities/cocktail.entity';


export const CocktailRepository = AppDataSource.getRepository(Cocktail);