import axios from "axios";

export class theCockTailDbService {
  static async getRandomCocktail() {
    try {
      const { data } = await axios.get(
        `${process.env.BE_THECOCKTAILDB_API_BASE}/random.php`
      );

      const cocktails = data.drinks;

      return cocktails.map(theCockTailDbService.mapCocktailProperties);
    } catch (e) {
      console.log("Failed to fetch random cocktail");
      console.log(e);
    }
  }

  static async searchCocktail(keywords) {
    try {
      const { data } = await axios.get(
        `${process.env.BE_THECOCKTAILDB_API_BASE}/search.php?s=${keywords}`
      );

      const cocktails = data.drinks;

      return cocktails.map(theCockTailDbService.mapCocktailProperties);
    } catch (e) {
      console.log("Failed to search cocktails");
      console.log(e);
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
