const maxWidthInPx = 1152;

const theme = {
  breakpoints: {
    xxs: 320,
    xs: 420,
    sm: 700,
    md: 1024,
    ml: maxWidthInPx,
    lg: 1440,
    xl: 1920,
    xxl: 2560,
  },
  zIndex: {
    header: 1000,
    footer: 1000,
    modal: 2000,
    sticky: 100,
  },
  fontFamily: {
    default: [
      '"SSTPro"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Roboto"',
      '"Oxygen"',
      '"Ubuntu"',
      '"Cantarell"',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(", "),
  },
  fontSizes: {
    h1: "2rem", // 32px
    h2: "1.75rem", // 28px
    h3: "1.375rem", // 22px
    h4: "1.125rem", // 18px
    h5: "1.0625rem", // 17px
    normal: "0.9375rem", // 15px
    button: "0.8125rem", // 13px
    buttonSmall: "0.8125rem", // 13px
    small: "0.8125rem", // 13px

    // fontSizes for medium breakpoint
    sm: {
      h1: "2.625rem", // 42px
      h2: "2.25rem", // 36px
      h3: "1.75rem", // 28px
      h4: "1.375rem", // 22px
      h5: "1.125rem", // 18px
      normal: "1rem", // 16px
      button: "1rem", // 16px
      buttonSmall: "0.8125rem", // 13px
      small: "0.875rem", // 14px
    },
  },
  lineHeight: {
    h1: "2.666rem",
    h2: "2.55rem",
    normal: "1.171875rem",
    small: "1.3rem",
    sm: {
      h1: "3.56rem",
      h2: "3.05rem",
      normal: "1.25rem",
      small: "1.25rem",
    },
  },
  spacing: {
    xSmall: "0.8125rem", // 13px
    small: "0.875rem", // 14px
    base: "1rem", // 16px
    wide: "1.25rem", // 20px
    h5: "1.125rem", // 18px
    h4: "1.375rem", // 22px
    h3: "1.75rem", // 28px
    h2: "2.25rem", // 36px
    h1: "2.625rem", // 42px
    grid: "0.5rem",
    section: "3.5rem",
    maxWidth: `${maxWidthInPx / 16}rem`,
    sm: {
      section: "7.5rem",
    },
    md: {
      grid: "1rem",
    },
  },
  colors: {
    white: "#FFFFFF",
    whiteRgb: "255, 255, 255",
    blackened: "#1F1F1F",
    black: "#000000",
    blackRgb: "0, 0, 0",
    background: "#000F26",
    backgroundRgb: "0, 15, 38",
    borderGray: "#CCC",

    textLight: "#999999",
    text: "#FFFFFF",
    textRgb: "255, 255, 255",
    highlight: "#F6FBFF",
    line: "#00A2FF",
    menu: "#404b5c",
    navy: "#000F26",
    navyRgb: "0, 15, 38",

    red: "#FF1E28",
    redMessage: "#ff0000",
    green: "#1fd660",

    blueLighter: "#00A2FF",
    blueLight: "#0089D8",
    blue: "#0072CE",
    blueTeam: "#0064CA",
    blueDark: "#0061AF",

    blueDarker: "#003791",
    blueWhale: "#152137",
    cyan: "#8FDFFD",

    orangeLighter: "#FFA25E",
    orangeLight: "#F27C38",
    orange: "#ED5F2B",
    orangeDark: "#D55527",
    orangeDarker: "#AF2F01",

    silverLighter: "#F5F5F5",
    silverLight: "#F3F3F3",
    silver: "#EEEEEE",
    silverDark: "#DEDEDE",
    silverDarker: "#D9D9D9",

    dropdown: {
      text: "#FFFFFF",
      bg: "transparent",
      border: "rgba(255, 255, 255, 0.2)",
      icon: "#FFFFFF",
      hover: {
        text: "#FFFFFF",
        bg: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.2)",
      },
      active: {
        text: "#FFFFFF",
        bg: "rgba(255, 255, 255, 0.1)",
        border: "rgba(255, 255, 255, 0.2)",
      },
      blueDark: "#1b2b44",
      blueDarkRgb: "rgba(27, 43, 68, 0.6)",
    },

    primary: {
      text: "#FFFFFF",
      bg: "#00A2FF",
      border: "transparent",
      hover: {
        text: "#FFFFFF",
        bg: "#26AFFF",
        border: "#26AFFF",
      },
      active: {
        text: "#FFFFFF",
        bg: "#00A2FF",
        border: "transparent",
      },
      disabled: {
        text: "rgba(255, 255, 255, 0.5)",
        bg: "rgba(0, 162, 255, 0.5)",
        border: "transparent",
      },
    },

    primaryInv: {
      text: "#00A2FF",
      bg: "transparent",
      border: "#00A2FF",
      hover: {
        text: "#00A2FF",
        bg: "rgba(0, 162, 255, 0.15)",
        border: "#00A2FF",
      },
      active: {
        text: "#FFFFFF",
        bg: "#00A2FF",
        border: "#00A2FF",
      },
      disabled: {
        text: "rgba(0, 162, 255, 0.5)",
        bg: "transparent",
        border: "rgba(0, 162, 255, 0.5)",
      },
    },

    secondary: {
      text: "#FFFFFF",
      bg: "rgba(255, 255, 255, 0.1)",
      border: "transparent",
      hover: {
        text: "#00A2FF",
        bg: "rgba(0, 162, 255, 0.15)",
        border: "transparent",
      },
      active: {
        text: "#FFFFFF",
        bg: "#00A2FF",
        border: "transparent",
      },
      disabled: {
        text: "rgba(255, 255, 255, 0.5)",
        bg: "rgba(255, 255, 255, 0.05)",
        border: "transparent",
      },
    },

    secondaryInv: {
      text: "#FFFFFF",
      bg: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      hover: {
        text: "#FFFFFF",
        bg: "rgba(0, 162, 255, 0.15)",
        border: "rgba(255, 255, 255, 0.2)",
      },
      active: {
        text: "#FFFFFF",
        bg: "#00A2FF",
        border: "#00A2FF",
      },
      disabled: {
        text: "rgba(255, 255, 255, 0.5)",
        bg: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.1)",
      },
    },

    warning: {
      text: "#FFFFFF",
      bg: "#ED5F2B",
      border: "transparent",
      hover: {
        text: "#FFFFFF",
        bg: "#F27C38",
        border: "#transparent",
      },
      active: {
        text: "#FFFFFF",
        bg: "#D55527",
        border: "#transparent",
      },
      disabled: {
        text: "rgba(255, 255, 255, 0.5)",
        bg: "rgba(237, 95, 43, 0.5)",
        border: "transparent",
      },
    },

    warningInv: {
      text: "#ED5F2B",
      bg: "transparent",
      border: "#ED5F2B",
      hover: {
        text: "#FFFFFF",
        bg: "rgba(237, 95, 43, 0.15)",
        border: "#ED5F2B",
      },
      active: {
        text: "#FFFFFF",
        bg: "#ED5F2B",
        border: "#ED5F2B",
      },
      disabled: {
        text: "rgba(237, 95, 43, 0.5)",
        bg: "transparent",
        border: "rgba(237, 95, 43, 0.5)",
      },
    },

    purchaseText: "#FFFFFF",
    purchase: "#ED5F2B",
    purchaseHover: "#F27C38",
    purchaseActive: "#D55527",

    link: "#00A2FF",
    linkRgb: "0, 162, 255",

    schemes: {
      light: {
        background: "#FFFFFF",
        textLight: "#999999",
        text: "#363636",
        textRgb: "54, 54, 54",
        link: "#0072CE",
        linkRgb: "0, 114, 206",

        dropdown: {
          text: "#363636",
          bg: "transparent",
          border: "#D9D9D9",
          icon: "rgba(31, 31, 31, 0.25)",
          hover: {
            text: "#363636",
            bg: "rgba(54, 54, 54, 0.1)",
            border: "#D9D9D9",
          },
          active: {
            text: "#363636",
            bg: "rgba(54, 54, 54, 0.1)",
            border: "#E4E4E4",
          },
        },

        primary: {
          bg: "#0072CE",
          border: "#0072CE",
          disabled: {
            text: "#00A2FF",
            bg: "#0061AF",
            border: "#0061AF",
          },
        },
        primaryInv: {
          text: "#0072CE",
          border: "#0072CE",
          hover: {
            text: "#FFFFFF",
            bg: "#0072CE",
            border: "#0072CE",
          },
          disabled: {
            text: "#00A2FF",
            border: "#00A2FF",
          },
        },

        secondary: {
          text: "#363636",
          bg: "#D9D9D9",
          border: "#D9D9D9",
          hover: {
            bg: "#E4E4E4",
            border: "#E4E4E4",
          },
          active: {
            bg: "#CECECE",
            border: "#CECECE",
          },
        },

        secondaryInv: {
          text: "#363636",
          border: "#363636",
          hover: {
            text: "#00A2FF",
            bg: "#D9D9D9",
            border: "#D9D9D9",
          },
          active: {
            text: "#00A2FF",
            bg: "#CECECE",
            border: "#CECECE",
          },
          disabled: {
            text: "#CECECE",
            border: "#CECECE",
          },
        },
      },
    },
  },
};

export default theme;
