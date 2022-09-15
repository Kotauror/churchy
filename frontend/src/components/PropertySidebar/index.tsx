import * as React from "react";
import { Feature } from "geojson";
import { Drawer } from "antd";
import { useState, useEffect } from "react";

export const CloseIcon = () => {
  return (
    <div>
      {"◄"}
    </div>
  )
}

export const PropertySidebar = ({
  feature,
  setActiveFeature
}: {
  feature: Feature;
  setActiveFeature: (arg: any) => void;
}): JSX.Element => {
  const [visible, setVisible] = useState(true);

  const onClose = () => {
    setVisible(false);
    setActiveFeature(undefined);
  };

  useEffect(() => {
    setVisible(true);
  }, [feature]);

  if (visible) {
    return (
      <div className="item-details">
        <Drawer
        //@ts-ignore ins
          onClose={onClose}
          getContainer={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1001,
            backgroundColor: "white",
            height: "100%",
            opacity: 0.9,
          }}
          open={visible}
          closeIcon={<CloseIcon />}
        >
          {feature!.properties!.name}
        </Drawer>
      </div>
    );
  } else {
    return <div></div>;
  }
};
