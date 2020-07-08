// Toggle the class of `<body>` tag based on light/dark mode

export default function toggleThemeClass(isLightMode: boolean): void {
  const container = document.body;
  if (isLightMode) {
    container.classList.add("light-theme");
  } else {
    container.classList.remove("light-theme");
  }
}
