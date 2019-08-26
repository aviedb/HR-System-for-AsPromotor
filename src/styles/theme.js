import { light as lightTheme } from '@eva-design/eva';

const pallete = {
  // basic colors for backgrounds, borders, texts
  "color-basic-100": "#FFFFFF",
  "color-basic-200": "#F7FAFC",
  "color-basic-300": "#EDF2F7",
  "color-basic-400": "#E2E8F0",
  "color-basic-500": "#CBD5E0",
  "color-basic-600": "#A0AEC0",
  "color-basic-700": "#718096",
  "color-basic-800": "#4A5568",
  "color-basic-900": "#2D3748",
  "color-basic-1000": "#1A202C",

  // primary colors
  "color-primary-100": "#C6E1F3",
  "color-primary-200": "#A5CFED",
  "color-primary-300": "#7DB9E5",
  "color-primary-400": "#4A9EDA",
  "color-primary-500": "#0077CC",
  "color-primary-600": "#006BB7",
  "color-primary-700": "#005DA0",
  "color-primary-800": "#004D84",
  "color-primary-900": "#00365D",

  // success colors - green
  "color-success-100": "#E7FFFE",
  "color-success-200": "#A8EEEB",
  "color-success-300": "#6DD8D3",
  "color-success-400": "#3DAEA3",
  "color-success-500": "#299187",
  "color-success-600": "#1B655E",
  "color-success-700": "#124543",

  // info colors - blue
  "color-info-100": "#EEF8FF",
  "color-info-200": "#A9D4F5",
  "color-info-300": "#64A2D8",
  "color-info-400": "#3183C8",
  "color-info-500": "#2368A1",
  "color-info-600": "#1A4971",
  "color-info-700": "#203D54",

  // warning colors - yellow
  "color-warning-100": "#FFFCF4",
  "color-warning-200": "#FDF3D7",
  "color-warning-300": "#FAE29F",
  "color-warning-400": "#F4CA64",
  "color-warning-500": "#CAA53D",
  "color-warning-600": "#8C6D1F",
  "color-warning-700": "#5C4813",

  // danger colors - red
  "color-danger-100": "#FCE8E8",
  "color-danger-200": "#F5AAAA",
  "color-danger-300": "#E46364",
  "color-danger-400": "#DD2F30",
  "color-danger-500": "#B82020",
  "color-danger-600": "#891B1B",
  "color-danger-700": "#601718",
};

const theme = {
  // basic colors
  "color-basic-default"   : pallete["color-basic-200"],
  "color-basic-active"    : pallete["color-basic-400"],
  "color-basic-focus"     : pallete["color-basic-500"],
  "color-basic-disabled"  : pallete["color-basic-600"],

  // primary colors
  "color-primary-default" : pallete["color-primary-500"],
  "color-primary-active"  : pallete["color-primary-600"],
  "color-primary-focus"   : pallete["color-primary-700"],
  "color-primary-disabled": pallete["color-primary-300"],

  // success colors
  "color-success-default" : pallete["color-success-500"],
  "color-success-active"  : pallete["color-success-600"],
  "color-success-focus"   : pallete["color-success-700"],
  "color-success-disabled": pallete["color-success-300"],

  // info colors
  "color-info-default"    : pallete["color-info-500"],
  "color-info-active"     : pallete["color-info-600"],
  "color-info-focus"      : pallete["color-info-700"],
  "color-info-disabled"   : pallete["color-info-300"],

  // warning colors
  "color-warning-default" : pallete["color-warning-500"],
  "color-warning-active"  : pallete["color-warning-600"],
  "color-warning-focus"   : pallete["color-warning-700"],
  "color-warning-disabled": pallete["color-warning-300"],

  // danger colors
  "color-danger-default"  : pallete["color-danger-500"],
  "color-danger-active"   : pallete["color-danger-600"],
  "color-danger-focus"    : pallete["color-danger-700"],
  "color-danger-disabled" : pallete["color-danger-400"],
}

const basic = {
  // background colors
  "background-basic-color-1": pallete["color-basic-100"],
  "background-basic-color-2": pallete["color-basic-200"],
  "background-basic-color-3": pallete["color-basic-300"],
  "background-basic-color-4": pallete["color-basic-400"],

  // border colors
  "border-basic-color-1": pallete["color-basic-100"],
  "border-basic-color-2": pallete["color-basic-200"],
  "border-basic-color-3": pallete["color-basic-300"],
  "border-basic-color-4": pallete["color-basic-400"],
  "border-basic-color-5": pallete["color-basic-500"],

  // text colors
  "text-basic-color"    : pallete["color-basic-1000"],
  "text-alternate-color": pallete["color-basic-100"],
  "text-control-color"  : pallete["color-basic-100"],
  "text-disabled-color" : pallete["color-basic-600"],
  "text-hint-color"     : pallete["color-basic-800"],

  "text-primary-color"         : theme["color-primary-default"],
  "text-primary-active-color"  : theme["color-primary-active"],
  "text-primary-disabled-color": theme["color-primary-disabled"],

  "text-success-color"         : theme["color-success-default"],
  "text-success-active-color"  : theme["color-success-active"],
  "text-success-disabled-color": theme["color-success-disabled"],

  "text-info-color"            : theme["color-info-default"],
  "text-info-active-color"     : theme["color-info-active"],
  "text-info-disabled-color"   : theme["color-info-disabled"],

  "text-warning-color"         : theme["color-warning-default"],
  "text-warning-active-color"  : theme["color-warning-active"],
  "text-warning-disabled-color": theme["color-warning-disabled"],

  "text-danger-color"          : theme["color-danger-default"],
  "text-danger-active-color"   : theme["color-danger-active"],
  "text-danger-disabled-color" : theme["color-danger-disabled"],

  // icon colors
  "icon-basic-color"   : pallete["color-basic-700"],
  "icon-active-color"  : pallete["color-primary-500"],
  "icon-control-color" : pallete["color-basic-600"],
  "icon-disabled-color": pallete["color-basic-400"],
  "icon-hint-color"    : pallete["color-basic-500"],

  // others
  "outline-color"      : pallete["color-basic-400"],
  "status-bar-android" : "#EEEEEE"
}

export default {
  ...lightTheme,
  ...pallete,
  ...theme,
  ...basic
}