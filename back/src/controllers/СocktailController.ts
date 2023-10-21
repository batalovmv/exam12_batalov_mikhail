import { Authorized, Body, CurrentUser, Delete, Get, HttpError, JsonController, Param, Post, Req, UseBefore } from "routing-controllers";

import { User } from "../entities/user.entity";
import { CocktailRepository } from "../repositories/cocktail.repository";
import { Cocktail } from "../entities/cocktail.entity";
import { MulterUpload } from "../multer/uploadCocktailPhoto";

@JsonController('/cocktails')
  @UseBefore(MulterUpload)
export class CocktailController {
  @Post()
  @UseBefore(MulterUpload)
  async create(@Body() cocktailData: any, @CurrentUser() user: User, @Req() req: any) {
    let newCocktail = new Cocktail();
    newCocktail.title = cocktailData.title;
    newCocktail.recipe = cocktailData.recipe;
    newCocktail.user = user;
    newCocktail.isPublished = false;

    
    if (req.file) {
      newCocktail.image = req.file.filename; 
    }

    await CocktailRepository.save(newCocktail);
    return newCocktail;
  }

  @Get('/my-cocktails')
  async getMyCocktails(@CurrentUser() user: User) {
    const cocktails = await CocktailRepository.find({ where: { user: user } });
    return cocktails;
  }
  @Get()
  async getCocktails() {
    const cocktails = await CocktailRepository.find({ where: { isPublished: true } });
    return cocktails;
  }

  @Authorized('admin')
  @Delete('/:cocktailId')
  async deleteCocktail(@Param('cocktailId') cocktailId: number) {
    const cocktail = await CocktailRepository.findOne({ where: { id: cocktailId } });
    if (!cocktail) throw new HttpError(400, "Cocktail not found");
    await CocktailRepository.remove(cocktail);
    return { message: 'Cocktail deleted' };
  }
  @Authorized('admin')
  @Post('/publish/:cocktailId')
  async publishCocktail(@Param('cocktailId') cocktailId: number) {
    const cocktail = await CocktailRepository.findOne({ where: { id: cocktailId } });
    if (!cocktail) throw new HttpError(400, "Cocktail not found");
    cocktail.isPublished = true;
    await CocktailRepository.save(cocktail);
    return { message: 'Cocktail published' };
  }
}