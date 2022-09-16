import * as React from "react";
import { Feature } from "geojson";
import { Drawer } from "antd";
import { useState, useEffect } from "react";

export const CloseIcon = () => {
  return <div className="drawer-icon">{"◄"}</div>;
};

export const OpenIcon = ({ onClick }: { onClick: any }) => {
  return (
    <button
      className="back-button"
      style={{
        zIndex: 1002,
        position: "absolute",
        top: "calc(50% - 50px)",
        height: "50px",
        left: 0,
        width: "20px",
        fontSize: "x-small",
        color: "#8d8d8d",
        border: 0,
        borderLeft: "1px solid rgb(218,220,224)",
        boxShadow:
          "0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
        borderRadius: "0 8px 8px 0",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      {"►"}
    </button>
  );
};

export const RemoveIcon = ({ onClick }: { onClick: any }) => {
  return (
    <button
      style={{
        zIndex: 1002,
        position: "absolute",
        top: 0,
        left: 0,
        margin: "0.5em",
        color: "#535353",
        border: "solid #8d8d8d",
        borderRadius: "2px",
        height: "2em",
        width: "2em"
      }}
      onClick={onClick}
    >
      {"x"}
    </button>
  );
};

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
  };

  const onRemove = () => {
    setVisible(false);
    setActiveFeature(undefined);
  };

  useEffect(() => {
    setVisible(true);
  }, [feature]);

  return (
    <div className="item-details">
      {visible && (
        <div>
          <RemoveIcon onClick={() => onRemove()} />
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
              opacity: 0.9
            }}
            open={visible}
            closeIcon={<CloseIcon />}
          >
            {feature!.properties!.name}
          </Drawer>
        </div>
      )}
      {!visible && <OpenIcon onClick={() => setVisible(true)} />}
    </div>
  );
};
