const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
