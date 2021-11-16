const globalThemeColour1 = "#5F901C";
const globalThemeColour2 = "#89cf29";
const globalThemeColour3 = "#395610";
const globalGlassColour1 = "rgba(0,0,0,0.7)";
const globalGlassColour2 = "rgba(0,0,0,0.9)";

export const theme = {
  pallet: {
    bodyBackground1: "#222",
    bodyBackground2: "#333",
    foregroundColour1: "#fff",
    errorTextColour: "#eee",

    sidebarBackgroundColour: globalGlassColour1,
    sidebarBackgroundColour2: globalGlassColour1,
    sidebarForegroundColour1: "#fff",
    sidebarForegroundColour2: "#ccc",
    sidebarHeaderBackgroundColour1: globalThemeColour1,
    sidebarButtonBackgroundColour: "rgba(0,0,0,0.2)",
    sidebarButtonHoverBackgroundColour: globalThemeColour1,

    articleJumbotronBackgroundColour1: globalGlassColour1,
    articleRowBackgroundcolour: globalGlassColour1,
    articleRowHoverBackgroundcolour: globalThemeColour1,
    newsRowBackgroundcolour: globalGlassColour1,

    articleBackgroundColour: globalGlassColour1,
    glassBackgroundColour: "rgba(0,0,0,0.5)",

    navbarBackgroundColour: globalGlassColour1,
    navbarForegroundColour: "#fff",
    navbarItemHoverColour: globalThemeColour1,
    navbarItemHoverBackgroundColour: globalThemeColour1,

    themeColour1: globalThemeColour2,
    themeColour2: globalThemeColour2,

    buttonBackgroundColour: globalThemeColour1,
    buttonBackgroundHoverColour: globalThemeColour3,

    contextMenuBackgroundColour: globalGlassColour2,
    contextMenuButtonHoverColour: globalThemeColour3,

    modalBackgroundColour: "#333",
    modalFontColour: "#eee",

    panelBackgroundColor: "#fff",
    panelBackgroundColorAlt: "#f5f5f5",

    formControlBackgroundColour: "#333",
    formControlTextColourColour: "#e5e5e5",
    formControlBoxColour: "#fff",
    formControlBoxSelectedColour: globalThemeColour1,
    formControlSelectItemHoverColour: globalThemeColour3,
    formControlSelectItemSelectedColour: globalThemeColour1,

    disabledArticleColor: "red",
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
