import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { cocktailApi } from "./api/cocktail.api.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const missingEnvironmentVariables = [
  "PORT",
  "BE_THECOCKTAILDB_API_BASE",
].filter((environmentVariable) => !(environmentVariable in process.env));

if (missingEnvironmentVariables.length) {
  missingEnvironmentVariables.forEach((missingEnv) =>
    console.error(`Missing environment variable: ${missingEnv}`)
  );

  process.exit(1);
}

app.use("/api/cocktail", cocktailApi());

// serve contents of public folder on /cocktail
app.use(
  "/cocktail",
  express.static(path.normalize(__dirname + "/../../public"), {
    dotfiles: "deny",
    extensions: ["js", "html", "css", "js.map"],
    fallthrough: true,
    index: false,
  })
);

// history api fallback
app.use("/cocktail", (req, res) => {
  res.sendFile(path.normalize(__dirname + "/../../public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
