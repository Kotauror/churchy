import * as React from "react";
import { Feature } from "geojson";
import { Drawer } from "antd";
import { useState, useEffect } from "react";
import "./PropertySidebar.css";

const ToggleVisibility = ({ arrow, onClick }: { arrow: any; onClick: any }) => {
  return (
    <div className="propertySidebar__toggleVisibility">
      <button className="toggle-visibility__btn" onClick={() => onClick()}>
        {arrow}
      </button>
    </div>
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
          <ToggleVisibility
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
