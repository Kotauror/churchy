import { doRequest } from "../Request";
import { PropertyBaseType } from "../components/MapWrapper";

const fetchImagesMetaData = (propertyId: number, propertyType: PropertyBaseType) => {
  return doRequest({
    path: `/images/?id=${propertyId}&property=${propertyType.toLocaleLowerCase()}`
  });
};

export default fetchImagesMetaData;
