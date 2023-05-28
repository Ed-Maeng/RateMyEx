// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F8FAFD",
    50: "#F0F0F0",
    100: "#F8FAFD",
    200: "#E7ECF3",
    300: "#C4CBD8",
    400: "#A7B0C0",
    500: "#8C94A4",
    600: "rgba(18, 18, 29, 0.6)",
    700: "#6F7789",
    800: "#1A1C2D",
    900: "#12121D",
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
    "default": "#007FFF",
    "signup": "#18A0FB",
    "alt": "#7182aa",
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
        default: colorTokens.button["default"],
        signup: colorTokens.button["signup"],
        alt: colorTokens.button["alt"],
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
      fontFamily: ["Inter"],
      fontSize: 12,

      h1b: {
        fontFamily: ["Inter"],
        fontWeight: 700,
        fontSize: 30,
      },
      h1r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 28,
      },
      h2b: {
        fontFamily: ["Inter"],
        fontWeight: 700,
        fontSize: 18,
      },
      h2r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 18,
      },
      h3b: {
        fontFamily: ["Inter"],
        fontWeight: 700,
        fontSize: 16,
      },
      h3r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 16,
      },
      h4b: {
        fontFamily: ["Inter"],
        fontWeight: 700,
        fontSize: 15,
      },
      h4r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 15,
      },
      h5b: {
        fontFamily: ["Inter"],
        fontWeight: 700,
        fontSize: 14,
      },
      h5r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 14,
      },
      h6b: {
        fontFamily: ["Inter"],
        fontWeight: 700,
        fontSize: 13,
      },
      h6r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 13,
      },
      h7b: {
        fontFamily: ["Inter"],
        fontWeight: 700,
        fontSize: 12,
      },
      h7r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 12,
      },
      h8b: {
        fontFamily: ["Inter"],
        fontWeight: 'bold',
        fontSize: 11,
      },
      h8r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 11,
      },
      h9b: {
        fontFamily: ["Inter"],
        fontWeight: 700,
        fontSize: 10,
      },
      h9r: {
        fontFamily: ["Inter"],
        fontWeight: 400,
        fontSize: 10,
      },
    },
  };
};
