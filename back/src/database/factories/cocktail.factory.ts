import { setSeederFactory } from "typeorm-extension";
import { Cocktail } from "../../entities/cocktail.entity";
import { Faker } from "@faker-js/faker";

export const CocktailFactory = setSeederFactory(Cocktail, (faker) => {
  const cocktail = new Cocktail();

  cocktail.title = faker.lorem.words(3);

  cocktail.image = faker.image.urlLoremFlickr({ category: 'food' });

  cocktail.recipe = faker.lorem.paragraphs(1);

  cocktail.isPublished = faker.datatype.boolean();

  return cocktail;
});