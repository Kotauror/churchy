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
import "./ChurchyMap.css";
import { Feature } from "geojson";

const getPlotsWithoutReclaimed = (plots: PropertyBase[]) => {
  return plots.filter(plot => plot.ownership_model !== "KP");
};

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
    center: [50.06, 19.938],
    zoom: 15,
    layers: [simplefMapStyle]
  });

  const createOverlayName = (text: string, id: string): string => {
    return `${text} <span class='legend-color' id='${id}'>____</span>`;
  };

  var overlayMaps = {
    [createOverlayName(
      "Niekomercyjne działki kościelne",
      "plots"
    )]: layerFactory(
      map,
      getPlotsWithoutReclaimed(plots),
      plotStyle,
      setActiveFeature
    ),
    [createOverlayName(
      "Działki odkupione przez miasto",
      "reclaimed"
    )]: layerFactory(
      map,
      plotsReclaimed,
      reclaimedStyle,
      setActiveFeature
    ),
    [createOverlayName(
      "Dostęp bez ograniczeń",
      "unrestricted"
    )]: layerFactory(
      map,
      fullyAccessibleGreens,
      unrestrictedGreenStyle,
      setActiveFeature
    ),
    [createOverlayName(
      "Dostęp w godzinach otwarcia kościoła",
      "daytimeOpen"
    )]: layerFactory(
      map,
      greensOpenDaytime,
      daytimeOpenGreenStyle,
      setActiveFeature
    ),
    [createOverlayName(
      "Dostęp dodatkowo ograniczony (np. za opłatą)",
      "specialAccess"
    )]: layerFactory(
      map,
      greensWithSpecialAccess,
      specialAccessGreenStyle,
      setActiveFeature
    ),
    [createOverlayName(
      "Brak dostępu",
      "noAccess"
    )]: layerFactory(
      map,
      noAccessGreen,
      noAccessGreenStyle,
      setActiveFeature
    )
  };

  // Layers control
  // TODO: made collapsed: true on mobile
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

  // pushes back the plots so that the inner plots are shown on hover
  overlayMaps[
    createOverlayName("Niekomercyjne działki kościelne", "plots")
  ].bringToBack();

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
    <div className="main-grid">
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
