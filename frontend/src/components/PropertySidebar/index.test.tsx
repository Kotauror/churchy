import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PropertySidebar } from ".";
import { Feature } from "geojson";
import fetchImagesMetaData from "../../crud/fetchImagesMetaData";
jest.mock("../../crud/fetchImagesMetaData");

describe("PropertySidebar", () => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());
  const setFeatureStub = jest.fn();
  const feature: Feature = {
    type: "Feature",
    properties: { id: 10, type: "Plot" },
    geometry: { type: "Point", coordinates: [] }
  };

  describe("images", () => {
    it("calls fetchImagesMetaData", () => {
      act(() => {
        render(
          <PropertySidebar
            feature={feature}
            setActiveFeature={setFeatureStub}
          />
        );
      });

      expect(fetchImagesMetaData).toHaveBeenCalled();
    });

    it("shows Loading when making the request", () => {
      render(
        <PropertySidebar feature={feature} setActiveFeature={setFeatureStub} />
      );

      expect(() => {
        screen.getByText("Ładowanie zdjęć");
      }).not.toThrow();
    });
  });

  describe("toggling visibility of an active feature", () => {
    it("shows the toggle arrow left when active feature visible (default)", () => {
      act(() => {
        render(
          <PropertySidebar
            feature={feature}
            setActiveFeature={setFeatureStub}
          />
        );
      });

      expect(screen.getAllByTestId("toggle-arrow-left")[0]).toBeVisible();
      expect(
        () => screen.getByTestId("toggle-arrow-right") as any[0]
      ).toThrow();
    });

    it("shows the toggle arrow right when the active feature is not visible", async () => {
      await act(() => {
        render(
          <PropertySidebar
            feature={feature}
            setActiveFeature={setFeatureStub}
          />
        );
      });

      fireEvent.click(screen.getByTestId("toggle-arrow-left") as any[0]);

      expect(screen.getAllByTestId("toggle-arrow-right")[0]).toBeVisible();
      expect(() => screen.getByTestId("toggle-arrow-left") as any[0]).toThrow();
    });
  });

  describe("when closing the drawer", () => {
    it("sets the active element to undefined", async () => {
      await act(async () => {
        render(
          <PropertySidebar
            feature={feature}
            setActiveFeature={setFeatureStub}
          />
        );
      });

      fireEvent.click(screen.getByLabelText("Close"));
      expect(setFeatureStub).toHaveBeenCalledWith(undefined);
    });
  });
});
