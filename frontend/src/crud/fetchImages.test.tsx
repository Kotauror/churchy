import * as request from "../Request";
import fetchImages from "./fetchImages";
import { PropertyBaseType } from "../components/MapWrapper";

describe("fetchImages", () => {
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());

  const doRequest = jest
    .spyOn(request, "doRequest")
    .mockImplementation(jest.fn());

  it("calls doRequest", () => {
    const propertyId = 124;
    const propertyType = PropertyBaseType.GREEN;

    fetchImages(propertyId, propertyType);

    const expectedDoRequestArgument = {
      path: `/images/?id=124&property=green`
    };
    expect(doRequest).toHaveBeenCalledWith(expectedDoRequestArgument);
  });
});
