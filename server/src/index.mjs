import express from "express";
import path from "path";
import { fileURLToPath } from "url";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
