import * as React from "react";
import L, { LatLngExpression } from "leaflet";
import "leaflet-textpath";
import { useEffect } from "react";
import { Plot, Green, Building } from "../MapWrapper";
import { analysedArea } from "./analysed_area";
import { PropertySidebar } from "../PropertySidebar";
import {
  plotStyle,
  specialAccessGreenStyle,
  daytimeOpenGreenStyle,
  unrestrictedGreenStyle,
  noAccessGreenStyle
} from "./polygon_styles";
import { layerFactory } from "./layer_factory";
import { Feature } from "geojson";

const defaultZoom = 14;
const simplefMapStyle = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxNativeZoom: 17
  }
);

const detailedMapStyle = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
  {
    detectRetina: true,
    maxZoom: 20,
    maxNativeZoom: 17,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }
);

var baseMaps = {
  "Wysoki kontrast": simplefMapStyle,
  "Szczegółowa mapa": detailedMapStyle
};

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
    zoom: defaultZoom,
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

  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

  // pushes back the plots so that the inner plots are shown on hover
  overlayMaps["Niekomercyjne działki kościelne"].bringToBack();

  const analysedAreaLine = L.polyline(analysedArea as LatLngExpression[])
    .addTo(map)
    .setStyle({ color: "lightgray", weight: 1.8, dashArray: "4, 4" });

  analysedAreaLine.setText("         granica analizy          ", {
    repeat: true,
    attributes: {
      fill: "dimgray",
      "font-size": "12",
      "background-colour": "red"
    }
  });

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
  }, [plots, fullyAccessibleGreens, buildings]);

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
