import { doRequest } from "../Request";
import { PropertyBaseType } from "../components/MapWrapper";

const fetchImages = (propertyId: number, propertyType: PropertyBaseType) => {
  return doRequest({
    path: `/images/churchy-${propertyType.toLocaleLowerCase()}s/${propertyId}`
  });
};

export default fetchImages;
