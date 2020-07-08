const path = require("path");

// Convert aboslute paths to relative ones
function toRelative(absolutePaths) {
  const cwd = process.cwd();
  return absolutePaths.map((file) => path.relative(cwd, file));
}

// Replace all backslashes (\) with forward-slashes (/)
function toForwardSlashes(absolutePaths) {
  return absolutePaths.map((filePath) => filePath.replace(/[\\]/g, "/"));
}

// Pass the 2nd argument "relative" to convert to relative path
function transformPaths(absolutePaths, conversion = "relative") {
  if (conversion === "relative") {
    // Change commas to spaces
    return toForwardSlashes(toRelative(absolutePaths)).join(" ");
  }
  // Change commas to spaces
  return toForwardSlashes(absolutePaths).join(" ");
}

module.exports = {
  // Stylelint
  "*.(html|css|scss|sass|md)": (absolutePaths) =>
    `stylelint --fix ${transformPaths(absolutePaths, "relative")}`,

  // TypeScript
  "*.(ts|tsx)": () => "tsc -p tsconfig.json --noEmit --skipLibCheck",

  // ESLint (use same regex as Jest will not work)
  "*.(j|t)s(x)?": (absolutePaths) =>
    `eslint --fix ${transformPaths(absolutePaths, "relative")}`,

  // Jest
  "*.(js|jsx|ts|tsx)": (absolutePaths) =>
    `jest --bail --findRelatedTests ${transformPaths(
      absolutePaths,
      "relative"
    )}`,

  // Prettier
  "*.(html|css|scss|js|jsx|ts|tsx|json|md)": (absolutePaths) =>
    `prettier --write ${transformPaths(absolutePaths, "relative")}`,
};
