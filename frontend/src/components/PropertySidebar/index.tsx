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

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActiveFeature(undefined);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  if (visible) {
    return (
      <div className="item-details" ref={wrapperRef}>
        <Drawer
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
