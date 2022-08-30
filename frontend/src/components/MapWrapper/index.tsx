import * as React from "react";
import { useState, useEffect } from "react";
import doRequest from "../../Request";
import { ChurchyMap } from "../ChurchyMap";

export interface PropertyBase {
  id: number;
  name: string;
  owner: string;
  address: string;
  description: string;
  religion: "RO" | "OR" | "JU" | "OT";
  visitors_access_details: string;
  coordinates: [][] | [number, number];
}

export interface Plot extends PropertyBase {
  visitors_access: "UR" | "OD" | "SA" | "NA";
  coordinates: [][];
}

export interface Building extends PropertyBase {
  purpose: "PP" | "CL" | "AD" | "OT";
  visitors_access: "UR" | "OD" | "SA" | "NA";
  paying_access: boolean;
  plot: number;
  coordinates: [number, number];
}

export interface Green extends PropertyBase {
  visitors_access: "UR" | "OD" | "SA" | "NA";
  green_type: "GD" | "PK" | "MD" | "SQ" | "CT";
  plot: number;
  coordinates: [][];
}

export const MapWrapper = (): JSX.Element => {
  const [plots, setPlots] = useState<Plot[]>([]);
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

      const buildingResult: Building[] = await doRequest({
        path: "/building/"
      });
      setBuildings(buildingResult);

      const greenResult: Green[] = await doRequest({ path: "/green/" });
      setFullyAccessibleGreens(
        greenResult.filter(green => green.visitors_access === "UR")
      );
      setGreensOpenDaytime(
        greenResult.filter(green => green.visitors_access === "OD")
      );
      setGreensWithSpecialAccess(
        greenResult.filter(green => green.visitors_access === "SA")
      );
      setNoAccessGreen(
        greenResult.filter(green => green.visitors_access === "NA")
      );
    })();
  }, []);

  const churchyMapProps = {
    plots,
    fullyAccessibleGreens,
    greensOpenDaytime,
    greensWithSpecialAccess,
    noAccessGreen,
    buildings
  };

  return <ChurchyMap {...churchyMapProps} />;
};
