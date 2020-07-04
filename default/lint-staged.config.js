const path = require("path");

// Convert aboslute path to relative
function toRelative(absolutePaths) {
  const cwd = process.cwd();
  return absolutePaths.map((file) => path.relative(cwd, file));
}

// Change comma to space
// Pass the 2nd argument "relative" to convert to relative path
function joinBySpace(absolutePaths, conversion = "relative") {
  if (conversion === "relative") {
    const relativePaths = toRelative(absolutePaths);
    return relativePaths.join(" ");
  }
  return absolutePaths.join(" ");
}

// Change comma to space
// Pass the 2nd argument "relative" to convert to relative path
// Change all backslash (\) to forward slash (/)
function toForwardSlash(absolutePaths, conversion = "relative") {
  if (conversion === "relative") {
    const relativePaths = toRelative(absolutePaths);
    return relativePaths
      .map((filePath) => filePath.replace(/[\\]/g, "/"))
      .join(" ");
  }
  return absolutePaths
    .map((filePath) => filePath.replace(/[\\]/g, "/"))
    .join(" ");
}

module.exports = {
  // Stylelint
  "*.(html|css|scss|sass|md)": (absolutePaths) =>
    `stylelint --fix ${toForwardSlash(absolutePaths, "relative")}`,

  // TypeScript
  "*.(ts|tsx)": () => "tsc -p tsconfig.json --noEmit --skipLibCheck",

  // ESLint (use same regex as Jest will not work)
  "*.(j|t)s(x)?": (absolutePaths) =>
    `eslint --fix ${toForwardSlash(absolutePaths, "relative")}`,

  // Jest
  "*.(js|jsx|ts|tsx)": (absolutePaths) =>
    `jest --bail --findRelatedTests ${toForwardSlash(
      absolutePaths,
      "relative"
    )}`,

  // Prettier
  "*.(html|css|scss|js|jsx|ts|tsx|json|md)": (absolutePaths) =>
    `prettier --write ${toForwardSlash(absolutePaths, "relative")}`,
};
