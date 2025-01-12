import { sizes } from "./sizes";
import { COLORS } from "./COLORS";
import { spaces, lineHeights } from "./spacing";
import { fontSizes } from "./fonts";
import { MD3DarkTheme as ReactNativePaperDefaultTheme } from "react-native-paper";
import { DefaultTheme } from "@react-navigation/native";

export const theme = {
  sizes,
  spaces,
  COLORS,
  fontSizes,
  lineHeights,
};

export const reactPaperTheme = {
  ...ReactNativePaperDefaultTheme,
  colors: {
    ...ReactNativePaperDefaultTheme.colors,
  },
};

export const reactNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#111",
  },
};
