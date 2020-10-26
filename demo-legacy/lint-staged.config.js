const path = require("path");
const { CLIEngine } = require("eslint");

/**
 * Convert aboslute paths to relative ones
 * @param {array} absolutePaths - An array of absolute paths
 */
function toRelative(absolutePaths) {
  const cwd = process.cwd();
  return absolutePaths.map((filePath) => path.relative(cwd, filePath));
}

/**
 * Replace all backslashes (\) in paths with forward-slashes (/)
 * @param {array} paths - An array of file paths
 */
function toForwardSlashes(paths) {
  return paths.map((filePath) => filePath.replace(/[\\]/g, "/"));
}

/**
 * Remove all file extensions from paths
 * @param {array} paths - An array of file paths
 */
function removeExtensions(paths) {
  return paths.map((filePath) => filePath.replace(/\.([a-zA-Z]+)/gi, ""));
}

/**
 * Transform absolute paths to other forms
 * @param {array} absolutePaths - An array of absolute paths passed by lint-staged
 * @param {string} [conversion=""] - "relative" to convert to relative path, "noExtension" to convert to relative path and remove all file extensions
 */
function transformPaths(absolutePaths, conversion = "") {
  // Convert to relative path
  if (conversion === "relative") {
    let relativePaths = toRelative(absolutePaths);
    // Change commas to spaces
    return toForwardSlashes(relativePaths).join(" ");
  }

  // Convert to relative path and remove all file extensions
  else if (conversion === "noExtension") {
    let relativePaths = toRelative(absolutePaths);
    relativePaths = removeExtensions(relativePaths);
    // Change commas to spaces
    return toForwardSlashes(relativePaths).join(" ");
  }

  // Change commas to spaces (absolute paths with file extensions)
  return toForwardSlashes(absolutePaths).join(" ");
}

/**
 * Remove paths that are ignored by ESLint
 * @param {array} paths - An array of file paths
 */
function removeESLintIgnoredFiles(paths) {
  const cli = new CLIEngine({});
  return paths.filter((filePath) => !cli.isPathIgnored(filePath));
}

module.exports = {
  // Stylelint
  "*.(html|css|scss|sass|md)": (absolutePaths) =>
    `stylelint --fix --max-warnings 0 ${transformPaths(
      absolutePaths,
      "relative"
    )}`,

  // TypeScript
  "*.(ts|tsx)": () => `tsc -p tsconfig.json --noEmit --skipLibCheck`,

  // ESLint
  "*.(js|jsx|ts|tsx)?": (absolutePaths) =>
    `eslint --fix --max-warnings=0 ${transformPaths(
      removeESLintIgnoredFiles(absolutePaths),
      "relative"
    )}`,

  // Jest
  "*.(js|jsx|ts|tsx)": (absolutePaths) =>
    `jest --bail --findRelatedTests ${transformPaths(
      absolutePaths,
      "noExtension"
    )}`,

  // Prettier
  "*.(html|css|scss|js|jsx|ts|tsx|json|md)": (absolutePaths) =>
    `prettier --write ${transformPaths(absolutePaths, "relative")}`,
};
