import * as React from "react";
import { useState, useEffect } from "react";

export const ChurchyMap = (): JSX.Element => {
  const [data, setData] = useState(null);
  const rootPath = process.env.REACT_APP_API_URL



  useEffect(() => {
    fetch(`${rootPath}churchy/`)
     .then((response) => console.log(response));
   }, []);


  return <div></div>;
};
