const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });

const nextJest = require("next/jest");

const createJestCOnfig = nextJest({
  dir: ".",
});
const jestConfig = createJestCOnfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
