import * as React from "react";
import { Feature } from "geojson";

export const PropertySidebar = (feature: {feature: Feature}): JSX.Element => {
  console.log(feature)

  return <div className="item-details">{feature!.feature!.properties!.name}</div>
};
