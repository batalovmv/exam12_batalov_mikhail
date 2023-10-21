import { setSeederFactory } from "typeorm-extension";
import { Ingredient } from "../../entities/ingredient.entity";

export const IngredientFactory = setSeederFactory(Ingredient, (faker) => {

  const ingredient = new Ingredient();

  ingredient.ingredientName = faker.word.noun(); 

  ingredient.ingredientQuantity = faker.number.int(100).toString(); 

  return ingredient;

});