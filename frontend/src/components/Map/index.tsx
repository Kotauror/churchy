import * as React from "react";
import { useState, useEffect } from "react";
import doRequest from "../../Request/index";

export const ChurchyMap = (): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const results = await doRequest({ path: "/churchy/" });
      setData(results);
    })();
  }, []);

  return <div>
  {data.map(record => (
    //@ts-ignore ins
    <p>{record.name}</p>
  ))}

  </div>;
};
