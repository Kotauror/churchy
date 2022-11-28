import * as React from "react";
import { useState, useEffect } from "react";
import { ImageMetaData } from "../PropertySidebar/index";

export const ImagesDisplayer = (fetchedimagesData: {
  imagesMetaData: ImageMetaData[];
}): JSX.Element => {
  const [urls, setUrls] = useState<string[]>([]);
  const [showMorePhotos, setShowMorePhotos] = useState<boolean>(true);
  useEffect(() => {
    const workingUrls: string[] = [];
    fetchedimagesData.imagesMetaData.map(imageMetaData => {
      workingUrls.push(
        `https://churchy-img.s3.eu-central-1.amazonaws.com/${
          imageMetaData!.id
        }.JPG`
      );
    });

    setUrls(workingUrls);
  }, [fetchedimagesData]);

  const buttonText = showMorePhotos ? "Zobacz więcej zdjęć" : "Ukryj zdjęcia";

  return (
    <div>
      <button onClick={() => setShowMorePhotos(!showMorePhotos)}>
        {buttonText}
      </button>
      {!showMorePhotos && (
        <ul>
          {urls.map(url => {
            return <img style={{ width: "100%" }} src={url} key={url}></img>;
          })}
        </ul>
      )}
    </div>
  );
};
