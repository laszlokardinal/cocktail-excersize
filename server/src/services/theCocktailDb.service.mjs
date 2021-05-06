import axios from "axios";
import { logger } from "../utils/logger.mjs";

export class theCockTailDbService {
  static async getRandomCocktail() {
    try {
      logger.info("start fetching random cocktail");

      const { data } = await axios.get(
        `${process.env.BE_THECOCKTAILDB_API_BASE}/random.php`
      );

      logger.info("finished fetching random cocktail");

      const cocktails = data.drinks;

      return cocktails.map(theCockTailDbService.mapCocktailProperties);
    } catch (e) {
      logger.error("failed to fetch random cocktail", e);
    }
  }

  static async searchCocktail(keywords) {
    try {
      logger.info("start searching cocktails");

      const { data } = await axios.get(
        `${process.env.BE_THECOCKTAILDB_API_BASE}/search.php?s=${keywords}`
      );

      logger.info("finished searching cocktails");

      const cocktails = data.drinks;

      return cocktails.map(theCockTailDbService.mapCocktailProperties);
    } catch (e) {
      logger.error("failed to search cocktails", e);
    }
  }

  static mapCocktailProperties(cocktail) {
    const ingredients = new Array(15)
      .fill(null)
      .map((_, index) => index + 1)
      .map((ingredientIndex) =>
        cocktail[`strIngredient${ingredientIndex}`]
          ? {
              name: cocktail[`strIngredient${ingredientIndex}`],
              measure: (cocktail[`strMeasure${ingredientIndex}`] || "").trim(),
            }
          : null
      )
      .filter((truthy) => truthy);

    return {
      name: cocktail.strDrink,
      instructions: cocktail.strInstructions,
      imageUrl: cocktail.strDrinkThumb,
      ingredients,
    };
  }
}
