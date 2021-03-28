export const theme = {
  pallet: {
    bodyBackground1: "#263942",
    bodyBackground2: "#132229",
    foregroundColour1: "#fff",

    sidebarBackgroundColour1: "#2b3b44",
    sidebarBackgroundColour2: "#132229",
    sidebarBackgroundColour3: "#162a33",
    sidebarForegroundColour1: "#fff",
    sidebarForegroundColour2: "#aaa",

    navbarBackgroundColour: "#233239",
    navbarForegroundColour: "#fff",
    navbarItemHoverColour: "#007cc4",
    navbarItemHoverBackgroundColour: "#0096c4",

    themeColour1: "#1485b9",
    themeColour2: "#008dc4",

    panelBackgroundColor: "#fff",
    panelBackgroundColorAlt: "#f5f5f5",
  },
  metrics: {
    sidebarWidth: "250px",
    topNavHeight: "65px",
    spinnerSize: "100px",
  },
};

type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
