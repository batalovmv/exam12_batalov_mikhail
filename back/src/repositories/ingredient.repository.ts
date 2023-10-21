import { AppDataSource } from '../data-source';
import { Ingredient } from '../entities/ingredient.entity';


export const IngredientRepository = AppDataSource.getRepository(Ingredient);