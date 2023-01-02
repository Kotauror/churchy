import * as React from "react";
import { useState, useEffect } from "react";
import doRequest from "../../Request";
import { ChurchyMap } from "../ChurchyMap";

export enum Religion {
  ROMAN = "RO",
  ORTHODOX = "OR",
  JUDAISM = "JU",
  OTHER = "OT"
}

export enum VisitorsAccessType {
  UNRESTRICTED = "UR",
  OPEN_DAYTIME = "OD",
  SOME_RESTRICTIONS = "SR",
  NO_ACCESS = "NA"
}

export interface PropertyBase {
  id: number;
  name: string;
  owner: string;
  address: string;
  description: string;
  ownership_model: string;
  religion: Religion;
  visitors_access_details: string | null;
  visitors_access: VisitorsAccessType;
  coordinates: [][] | [number, number];
}

export enum PropertyBaseType {
  PLOT = "Plot",
  GREEN = "Green"
} 

export interface Plot extends PropertyBase {
  coordinates: [][];
}

export interface Building extends PropertyBase {
  purpose: "PP" | "CL" | "AD" | "OT";
  praying_access: boolean;
  plot: number;
  coordinates: [number, number];
}

export interface Green extends PropertyBase {
  green_type: "GD" | "PK" | "MD" | "SQ" | "CT";
  plot: number;
  coordinates: [][];
}

export const MapWrapper = (): JSX.Element => {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [plotsReclaimed, setPlotsReclaimed] = useState<Plot[]>([]); 
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [fullyAccessibleGreens, setFullyAccessibleGreens] = useState<Green[]>(
    []
  );
  const [greensOpenDaytime, setGreensOpenDaytime] = useState<Green[]>([]);
  const [greensWithSpecialAccess, setGreensWithSpecialAccess] = useState<
    Green[]
  >([]);
  const [noAccessGreen, setNoAccessGreen] = useState<Green[]>([]);

  useEffect(() => {
    (async () => {
      const plotResult: Plot[] = await doRequest({ path: "/plot/" });
      setPlots(plotResult);
      setPlotsReclaimed(plotResult.filter(plot => plot.ownership_model === "KP"))

      const buildingResult: Building[] = await doRequest({
        path: "/building/"
      });
      setBuildings(buildingResult);

      const greenResult: Green[] = await doRequest({ path: "/green/" });
      setFullyAccessibleGreens(
        greenResult.filter(
          green => green.visitors_access === VisitorsAccessType.UNRESTRICTED
        )
      );
      setGreensOpenDaytime(
        greenResult.filter(
          green => green.visitors_access === VisitorsAccessType.OPEN_DAYTIME
        )
      );
      setGreensWithSpecialAccess(
        greenResult.filter(
          green =>
            green.visitors_access === VisitorsAccessType.SOME_RESTRICTIONS
        )
      );
      setNoAccessGreen(
        greenResult.filter(
          green => green.visitors_access === VisitorsAccessType.NO_ACCESS
        )
      );
    })();
  }, []);

  const churchyMapProps = {
    plots,
    plotsReclaimed,
    fullyAccessibleGreens,
    greensOpenDaytime,
    greensWithSpecialAccess,
    noAccessGreen,
    buildings
  };

  return <ChurchyMap {...churchyMapProps} />;
};
