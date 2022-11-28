import * as request from "../Request";
import fetchImagesMetaData from "./fetchImagesMetaData";
import { PropertyBaseType } from "../components/MapWrapper";

describe("fetchImagesMetaData", () => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());

  const doRequest = jest
    .spyOn(request, "doRequest")
    .mockImplementation(jest.fn());

  it("calls doRequest", () => {
    const propertyId = 124;
    const propertyType = PropertyBaseType.GREEN;

    fetchImagesMetaData(propertyId, propertyType);

    const expectedDoRequestArgument = {
      path: `/images/?id=124&property=green`
    };
    expect(doRequest).toHaveBeenCalledWith(expectedDoRequestArgument);
  });
});
