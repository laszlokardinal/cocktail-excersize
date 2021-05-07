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

      throw new Error("failed to communicate with thecocktaildb");
    }
  }

  static async searchCocktail(keywords) {
    try {
      logger.info("start searching cocktails");

      const { data } = await axios.get(
        `${process.env.BE_THECOCKTAILDB_API_BASE}/search.php?s=${keywords}`
      );

      logger.info("finished searching cocktails");

      const cocktails = data.drinks || [];

      return cocktails.map(theCockTailDbService.mapCocktailProperties);
    } catch (e) {
      logger.error("failed to search cocktails", e);

      throw new Error("failed to communicate with thecocktaildb");
    }
  }

  static mapCocktailProperties(cocktail) {
    const ingredients = new Array(15)
      .fill(null)
      .map((_, index) => index + 1)
      .map((ingredientIndex) => {
        if (!cocktail[`strIngredient${ingredientIndex}`]) return null;

        const name = cocktail[`strIngredient${ingredientIndex}`];
        const measure = (cocktail[`strMeasure${ingredientIndex}`] || "").trim();
        const imageUrl = `${process.env.BE_THECOCKTAILDB_IMAGES_BASE}/ingredients/${name}-Small.png`;

        return { name, measure, imageUrl };
      })
      .filter((truthy) => truthy);

    return {
      name: cocktail.strDrink,
      instructions: cocktail.strInstructions,
      imageUrl: cocktail.strDrinkThumb,
      ingredients,
    };
  }
}
