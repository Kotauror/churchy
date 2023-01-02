import * as React from "react";
import L from "leaflet";
import "leaflet-textpath";
import { useEffect } from "react";
import { Plot, Green, Building, PropertyBase } from "../MapWrapper";
import { analysedAreaProvider } from "./analysedArea";
import { PropertySidebar } from "../PropertySidebar";
import {
  plotStyle,
  specialAccessGreenStyle,
  daytimeOpenGreenStyle,
  unrestrictedGreenStyle,
  noAccessGreenStyle,
  reclaimedStyle
} from "./polygonStyles";
import { layerFactory } from "./layerFactory";
import { simplefMapStyle, baseMaps } from "./mapBaseProperties";
import "./ChurchyMap.css"
import { Feature } from "geojson";

const getPlotsWithoutReclaimed = (plots: PropertyBase[]) => {
  return plots.filter(plot => plot.ownership_model !== 'KP')
}

const createMap = (
  plots: Plot[],
  plotsReclaimed: Plot[],
  fullyAccessibleGreens: Green[],
  greensOpenDaytime: Green[],
  greensWithSpecialAccess: Green[],
  noAccessGreen: Green[],
  buildings: Building[],
  setActiveFeature: (feature: any) => void
) => {
  const map = L.map("map", {
    center: [50.060, 19.935],
    zoom: 15,
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
      getPlotsWithoutReclaimed(plots),
      plotStyle,
      setActiveFeature
    ),
    "Działki odkupione przez miasto": layerFactory(
      map,
      plotsReclaimed,
      reclaimedStyle,
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
  plotsReclaimed: Plot[];
  fullyAccessibleGreens: Green[];
  greensOpenDaytime: Green[];
  greensWithSpecialAccess: Green[];
  noAccessGreen: Green[];
  buildings: Building[];
}

export const ChurchyMap = ({
  plots,
  plotsReclaimed,
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
      plotsReclaimed,
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
    plotsReclaimed,
    fullyAccessibleGreens,
    buildings,
    greensWithSpecialAccess,
    greensOpenDaytime,
    noAccessGreen
  ]);
  return (
    <div className="main-grid" >
      <div id="map"></div>
      {activeFeature !== undefined && (
        <PropertySidebar
          feature={activeFeature}
          setActiveFeature={setActiveFeature}
        />
      )}
    </div>
  );
};
