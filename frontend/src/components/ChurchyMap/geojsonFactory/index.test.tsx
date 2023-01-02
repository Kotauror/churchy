import { geoJsonsFactory } from "./index";
import { Religion, VisitorsAccessType } from "../../MapWrapper";

describe("geoJsonsFactory", () => {
  it("transforms properties as received from the BE into geojson features", () => {
    const properties = [
      {
        id: 1,
        name: "Kosciół",
        owner: "Zakon",
        address: "123 ulica",
        description: "kociółek",
        ownership_model: "KP",
        religion: Religion.ROMAN,
        visitors_access: VisitorsAccessType.SOME_RESTRICTIONS,
        visitors_access_details: null,
        coordinates: []
      },
      {
        id: 2,
        name: "Ogród",
        owner: "Zakon 2",
        address: "222 ulica",
        description: "kociółek 2",
        ownership_model: "KP",
        green_type: "GD",
        religion: Religion.ROMAN,
        visitors_access: VisitorsAccessType.NO_ACCESS,
        visitors_access_details: null,
        coordinates: []
      }
    ];

    const expected_result = [
      {
        type: "Feature",
        properties: {
          id: 1,
          propertyType: "Plot",
          name: "Kosciół",
          description: "kociółek"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[]]
        }
      },
      {
        type: "Feature",
        properties: {
          id: 2,
          propertyType: "Green",
          name: "Ogród",
          description: "kociółek 2"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[]]
        }
      }
    ];

    const geojsons = geoJsonsFactory(properties);

    expect(geojsons).toEqual(expected_result);
  });
});
