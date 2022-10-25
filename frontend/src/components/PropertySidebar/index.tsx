import * as React from "react";
import { Feature } from "geojson";
import { Drawer } from "antd";
import { useState, useEffect } from "react";

export const CloseIcon = ({ arrow, onClick }: { arrow: any; onClick: any }) => {
  return (
    <div className="drawer-icon">
      <button
        style={{
          zIndex: 1002,
          position: "absolute",
          top: "calc(50% - 50px)",
          height: "50px",
          right: "-25px",
          width: "25px",
          fontSize: "x-small",
          color: "#8d8d8d",
          border: 0,
          borderLeft: "1px solid rgb(218,220,224)",
          boxShadow:
            "0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
          borderRadius: "0 8px 8px 0",
          cursor: "pointer",
          padding: "inherit"
        }}
        onClick={() => onClick()}
      >
        {arrow}
      </button>
    </div>
  );
};

export const OpenIcon = ({ onClick }: { onClick: any }) => {
  return (
    <button className="back-button" onClick={onClick}>
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
    setActiveFeature(undefined);
  };

  useEffect(() => {
    setVisible(true);
  }, [feature]);

  return (
    <div className="item-details">
      <div>
        <Drawer
          //@ts-ignore ins
          onClose={onClose}
          getContainer={false}
          style={{
            position: "absolute",
            top: 0,
            width: "22em",
            left: visible ? 0 : "-22em",
            zIndex: 1001,
            backgroundColor: "white",
            boxShadow:
              "rgb(60 64 67 / 30%) 0px 1px 2px, rgb(60 64 67 / 15%) 0px 2px 6px 2px",
            height: "100%",
            opacity: 0.97,
            transition: "all 0.5s cubic-bezier(0.4, 0, 1, 1) 0s"
          }}
          open={visible}
        >
          {feature!.properties!.name}
          <CloseIcon
            arrow={
              <span className="material-icons md-light">
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
