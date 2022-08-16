import { Green } from "../MapWrapper";

export const plotStyle = {
  color: "#646B64",
  weight: 1,
  fillOpacity: 0.2
};

export const getGreenStyle = (green: Green) => {
  switch (green.visitors_access) {
    case "UR":
      return unrestrictedGreenStyle;
    case "OD":
      return daytimeOpenGreenStyle;
    case "SA":
      return specialAccessGreenStyle;
    case "NA":
      return noAccessGreenStyle;
  }
};

export const unrestrictedGreenStyle = {
  color: "#53B816",
  weight: 1,
  fillOpacity: 0.2
};

export const daytimeOpenGreenStyle = {
  color: "#53B816",
  weight: 1,
  fillOpacity: 0.6
};

export const specialAccessGreenStyle = {
  color: "orange",
  weight: 1,
  fillOpacity: 0.6
};

export const noAccessGreenStyle = {
  color: "red",
  weight: 1,
  fillOpacity: 0.6
};
