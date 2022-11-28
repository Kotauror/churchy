import * as React from "react";
import { Feature } from "geojson";
import { Drawer } from "antd";
import { useState, useEffect } from "react";
import "./PropertySidebar.css";
import fetchImagesMetaData from "../../crud/fetchImagesMetaData";
import { ImagesDisplayer } from "../ImagesDisplayer";

const ToggleVisibility = ({ arrow, onClick }: { arrow: any; onClick: any }) => {
  return (
    <div className="propertySidebar__toggleVisibility">
      <button className="toggle-visibility__btn" onClick={() => onClick()}>
        {arrow}
      </button>
    </div>
  );
};

export interface ImageMetaData {
  id: string;
  author: string;
  source: string;
}

export const PropertySidebar = ({
  feature,
  setActiveFeature
}: {
  feature: Feature;
  setActiveFeature: (arg: any) => void;
}): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const [imagesMetaData, setImagesMetaData] = useState<ImageMetaData[]>();
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setVisible(false);
    setActiveFeature(undefined);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchedImagesMetaData = await fetchImagesMetaData(
        feature.properties!.id,
        feature.properties!.propertyType
      );
      setImagesMetaData(fetchedImagesMetaData);
      setLoading(false);
    })();
    setVisible(true);
  }, [feature]);

  return (
    <div className="propertySidebar">
      <div>
        <Drawer
          //@ts-ignore ins
          className="propertySidebar__drawer"
          onClose={onClose}
          getContainer={false}
          style={{
            left: visible ? 0 : "-22em"
          }}
          open={visible}
        >
          {feature!.properties!.name}
          {imagesMetaData && imagesMetaData.length > 0 && (
            <ImagesDisplayer imagesMetaData={imagesMetaData} />
          )}
          {loading && "Ładowanie zdjęć"}
          <ToggleVisibility
            arrow={
              <span
                className="material-icons md-light"
                data-testid={`toggle-arrow-${visible ? "left" : "right"}`}
              >
                arrow_{visible ? "left" : "right"}
              </span>
            }
            onClick={() => setVisible(!visible)}
          />
        </Drawer>
      </div>
    </div>
  );
};
