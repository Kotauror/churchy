import * as React from "react";
import L from "leaflet";
import "leaflet-textpath";
import { useEffect } from "react";
import { Plot, Green, Building } from "../MapWrapper";
import { analysedAreaProvider } from "./analysed_area";
import { PropertySidebar } from "../PropertySidebar";
import {
  plotStyle,
  specialAccessGreenStyle,
  daytimeOpenGreenStyle,
  unrestrictedGreenStyle,
  noAccessGreenStyle
} from "./polygon_styles";
import { layerFactory } from "./layer_factory";
import { simplefMapStyle, baseMaps } from "./map_base_properties";
import { Feature } from "geojson";

const createMap = (
  plots: Plot[],
  fullyAccessibleGreens: Green[],
  greensOpenDaytime: Green[],
  greensWithSpecialAccess: Green[],
  noAccessGreen: Green[],
  buildings: Building[],
  setActiveFeature: (feature: any) => void
) => {
  const map = L.map("map", {
    center: [50.051, 19.935],
    zoom: 14,
    layers: [simplefMapStyle]
  });

  var overlayMaps = {
    "Dostęp bez ograniczeń": layerFactory(
      map,
      fullyAccessibleGreens,
      unrestrictedGreenStyle,
      setActiveFeature
    ),
    "Dostęp w godzinach otwarcia kościoła": layerFactory(
      map,
      greensOpenDaytime,
      daytimeOpenGreenStyle,
      setActiveFeature
    ),
    "Dostęp dodatkowo ograniczony (np. za opłatą)": layerFactory(
      map,
      greensWithSpecialAccess,
      specialAccessGreenStyle,
      setActiveFeature
    ),
    "Brak dostępu": layerFactory(
      map,
      noAccessGreen,
      noAccessGreenStyle,
      setActiveFeature
    ),
    "Niekomercyjne działki kościelne": layerFactory(
      map,
      plots,
      plotStyle,
      setActiveFeature
    )
  };

  // Layers control
  // TODO: made collapsed: true on mobile
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

  // pushes back the plots so that the inner plots are shown on hover
  overlayMaps["Niekomercyjne działki kościelne"].bringToBack();

  // add analysed area polyline
  analysedAreaProvider().addTo(map);

  return map;
};

interface ChurchyMapProps {
  plots: Plot[];
  fullyAccessibleGreens: Green[];
  greensOpenDaytime: Green[];
  greensWithSpecialAccess: Green[];
  noAccessGreen: Green[];
  buildings: Building[];
}

export const ChurchyMap = ({
  plots,
  fullyAccessibleGreens,
  greensOpenDaytime,
  greensWithSpecialAccess,
  noAccessGreen,
  buildings
}: ChurchyMapProps): JSX.Element => {
  const [activeFeature, setActiveFeature] = React.useState<Feature>();

  useEffect(() => {
    const map = createMap(
      plots,
      fullyAccessibleGreens,
      greensOpenDaytime,
      greensWithSpecialAccess,
      noAccessGreen,
      buildings,
      setActiveFeature
    );

    return () => {
      map.remove();
    };
  }, [
    plots,
    fullyAccessibleGreens,
    buildings,
    greensWithSpecialAccess,
    greensOpenDaytime,
    noAccessGreen
  ]);

  return (
    <div className="main-grid">
      <div id="map" style={{ height: "800px" }}></div>
      {activeFeature !== undefined && (
        <PropertySidebar
          feature={activeFeature}
          setActiveFeature={setActiveFeature}
        />
      )}
    </div>
  );
};
