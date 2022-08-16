import * as React from "react";
import { useState, useEffect } from "react";
import doRequest from "../../Request";
import { ChurchyMap } from "../ChurchyMap";

export interface Plot {
  address: string;
  coordinates: [][];
  description: string;
  id: number;
  name: string;
  owner: string;
  religion: "RO" | "OR" | "JU" | "OT";
  visitors_access: "UR" | "OD"| "SA" | "NA";
  visitors_access_details: string;
}

export interface Building {
  address: string;
  coordinates: [number, number];
  description: string;
  id: number;
  name: string;
  owner: string;
  purpose: "PP" | "CL" | "AD" | "OT";
  religion: "RO" | "OR" | "JU" | "OT";
  visitors_access: "UR" | "OD"| "SA" | "NA";
  paying_access: boolean;
  visitors_access_details: string;
  plot: number;
}

export interface Green {
  address: string;
  coordinates: [][];
  description: string;
  id: number;
  name: string;
  owner: string;
  religion: "RO" | "OR" | "JU" | "OT";
  visitors_access: "UR" | "OD"| "SA" | "NA";
  green_type: "GD" | "PK" | "MD" | "SQ" | "CT";
  visitors_access_details: string;
  plot: number;
}

export const MapWrapper = (): JSX.Element => {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [greens, setGreens] = useState<Green[]>([]);


  useEffect(() => {
    (async () => {
      const plotResult: Plot[] = await doRequest({ path: "/plot/" });
      setPlots(plotResult);

      const buildingResult: Building[] = await doRequest({ path: "/building/" });
      setBuildings(buildingResult);

      const greenResult: Green[] = await doRequest({ path: "/green/" });
      setGreens(greenResult);
    })();
  }, []);

  return <ChurchyMap plots={plots} greens={greens} buildings={buildings} />;
};
