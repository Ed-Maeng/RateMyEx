// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F9F9F9",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#FFFFFF",
    100: "#E4E6EB",
    200: "#B0B3BB",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#121212",
  },
  button: {
    0: "#1F51FF",
    50: "#7182aa",
  }
};

// mui theme settings
export const themeSettings = () => {
  return {
    palette: {
      primary: {
        main: colorTokens.primary[500],
        secondary: colorTokens.primary[200],
        light: colorTokens.primary[50],
      },
      button: {
        default: colorTokens.button[0],
        alt: colorTokens.button[50],
      },
      neutral: {
        dark: colorTokens.grey[700],
        main: colorTokens.grey[500],
        mediumMain: colorTokens.grey[400],
        medium: colorTokens.grey[300],
        light: colorTokens.grey[50],
      },
      background: {
        default: colorTokens.grey[0],
        alt: colorTokens.grey[10],
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
