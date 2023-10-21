import { Body, CurrentUser, HttpError, JsonController, Param, Post } from "routing-controllers";
import { User } from "../entities/user.entity";
import { CocktailRepository } from "../repositories/cocktail.repository";
import { Rating } from "../entities/rating.entity";
import { RatingRepository } from "../repositories/rating.repository";

@JsonController('/ratings')
export class RatingController {
  @Post('/:cocktailId')
  async rateCocktail(@Body() ratingData: any, @Param('cocktailId') cocktailId: number, @CurrentUser() user: User) {
    const cocktail = await CocktailRepository.findOne({ where: { id: cocktailId } });
    if (!cocktail) throw new HttpError(400, "Cocktail not found");

    let rating = await RatingRepository.findOne({ where: { user: user, cocktail: cocktail } });
    if (!rating) {
      rating = new Rating();
      rating.cocktail = cocktail;
      rating.user = user;
    }

    rating.rating = ratingData.rating; 
    await RatingRepository.save(rating);
    return rating;
  }
}