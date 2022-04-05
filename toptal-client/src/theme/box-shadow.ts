import {themeColors} from "./colors";
import {hexToRgb} from "./hex-to-rgb";

export const boxShadows = {
  boxShadow: "0 0 2rem 0 rgba(" + hexToRgb(themeColors.gray[600]) + ",.15)",
  buttonBoxShadow:
    "0 7px 14px rgba(" +
    hexToRgb(themeColors.gray[800]) +
    ",0.1), 0 3px 6px rgba(" +
    hexToRgb(themeColors.black.main) +
    ", 0.08)",
  buttonBoxShadowNeutral:
    "0 4px 6px rgba(" +
    hexToRgb(themeColors.gray[800]) +
    ",0.11), 0 1px 3px rgba(" +
    hexToRgb(themeColors.black.main) +
    ", 0.08)",
  iconsPageButtonBoxShadow:
    "0 0 0 1px rgba(" +
    hexToRgb(themeColors.black.main) +
    ", 0.1), 0 4px 16px rgba(" +
    hexToRgb(themeColors.black.main) +
    ", 0.1)",
  inputBoxShadow:
    "0 1px 3px rgba(" +
    hexToRgb(themeColors.gray[800]) +
    ",0.15), 0 1px 0 rgba(" +
    hexToRgb(themeColors.black.main) +
    ", 0.02)",
  linearProgressBoxShadow:
    "inset 0 1px 2px rgba(" + hexToRgb(themeColors.black.main) + ", 0.1)",
  menuBoxShadow:
    "0 50px 100px rgba(" +
    hexToRgb(themeColors.gray[800]) +
    ",0.10), 0 15px 35px rgba(" +
    hexToRgb(themeColors.gray[800]) +
    ",0.15), 0 5px 15px rgba(" +
    hexToRgb(themeColors.black.main) +
    ", 0.1)",
  sliderBoxShadow:
    "inset 0 1px 2px rgba(" + hexToRgb(themeColors.gray[800]) + ", 0.1)",
  popoverBoxShadow:
    "0px 0.5rem 2rem 0px rgba(" + hexToRgb(themeColors.black.main) + ", 0.2)",
};

