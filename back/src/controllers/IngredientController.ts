import { Authorized, Body, CurrentUser, Delete, HttpError, JsonController, Param, Post } from "routing-controllers";
import { CocktailRepository } from "../repositories/cocktail.repository";
import { Ingredient } from "../entities/ingredient.entity";
import { IngredientRepository } from "../repositories/ingredient.repository";
import { User } from "../entities/user.entity";
type IngredientData = {
  ingredientName: string;
  ingredientQuantity: string;
};


@JsonController('/ingredients')
export class IngredientController {
  @Post('/:cocktailId')
  async addIngredient(@Body() ingredientData: IngredientData, @Param('cocktailId') cocktailId: number) {

    const cocktail = await CocktailRepository.findOne({ where: { id: cocktailId } });
    if (!cocktail) throw new HttpError(400, "Cocktail not found");

    let ingredient = new Ingredient();
    ingredient.ingredientName = ingredientData.ingredientName;
    ingredient.ingredientQuantity = ingredientData.ingredientQuantity;
    ingredient.cocktail = cocktail;
    await IngredientRepository.save(ingredient);
    return ingredient;
  }
  @Authorized()
  @Delete('/:ingredientId')
  async deleteIngredient(@Param('ingredientId') ingredientId: number, @CurrentUser() user: User) {
    const ingredient = await IngredientRepository.findOne({ where: { id: ingredientId, cocktail: { user: user } } });
    if (!ingredient) throw new HttpError(400, "Ingredient not found");
    await IngredientRepository.remove(ingredient);
    return { message: 'Ingredient deleted' };
  }
}