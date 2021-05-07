import { Router } from "express";

import { theCockTailDbService } from "../services/theCocktailDb.service.mjs";

export const cocktailApi = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      if ("keywords" in req.query) {
        const cocktails = await theCockTailDbService.searchCocktail(
          req.query.keywords
        );

        res.status(200).send({
          data: cocktails,
          length: cocktails.length,
        });
      } else {
        const randomCocktail = await theCockTailDbService.getRandomCocktail();

        res.status(200).send({
          data: [randomCocktail],
          length: 1,
        });
      }
    } catch (e) {
      res.status(500).send({
        error: "Internal server error",
      });
    }
  });

  return router;
};
