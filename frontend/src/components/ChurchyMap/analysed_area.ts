import L, { LatLngExpression } from "leaflet";

const analysedArea = [
  [50.073627984468, 19.93431029076],
  [50.072580736366, 19.931331051344],
  [50.071290968003, 19.928902037004],
  [50.070233248049, 19.927217310667],
  [50.068930122752, 19.92645251821],
  [50.067158348775, 19.924754198538],
  [50.062407061996, 19.923553499671],
  [50.059418736852, 19.925160045402],
  [50.059420210108, 19.92497519381],
  [50.056830408056, 19.906253541348],
  [50.055984381276, 19.907901403839],
  [50.055482294039, 19.911219492774],
  [50.055234121904, 19.912508838527],
  [50.051788827747, 19.911704098364],
  [50.048858596153, 19.905918568005],
  [50.047510499125, 19.910883709304],
  [50.045349552244, 19.913245545496],
  [50.04438442371, 19.914890631217],
  [50.04413767071, 19.915994867571],
  [50.048887310332, 19.932351142467],
  [50.046966914255, 19.934347091521],
  [50.042673874788, 19.935372648001],
  [50.041601357984, 19.935536618029],
  [50.038603907025, 19.938250366651],
  [50.035717902012, 19.94188990354],
  [50.035696879754, 19.94447653778],
  [50.036136718337, 19.948920142773],
  [50.037194133572, 19.950604137878],
  [50.040602711993, 19.955846069776],
  [50.042099358508, 19.961974641682],
  [50.04316271538, 19.962919982891],
  [50.049887933561, 19.955660806688],
  [50.051212161122, 19.953838619756],
  [50.053413737623, 19.961091692138],
  [50.057833627391, 19.959146374783],
  [50.061989520896, 19.960338584201],
  [50.065448216007, 19.959483128188],
  [50.066284283982, 19.959129994962],
  [50.067004402717, 19.958404719253],
  [50.068741851869, 19.949748292597],
  [50.071124916646, 19.949425510905],
  [50.074128648588, 19.945971027221],
  [50.072956688629, 19.943728783554],
  [50.073712678427, 19.938565441306],
  [50.073746986899, 19.934312603253]
];

const analysedAreaText = "        granica analizy         ";

export const analysedAreaProvider = (): L.Polyline => {
  const line = L.polyline(analysedArea as LatLngExpression[]);
  line
    .setStyle({ color: "lightgray", weight: 10, opacity: 0.7 })
    .setText(analysedAreaText, {
      repeat: true,
      attributes: {
        fill: "dimgray",
        "font-size": "12"
      }
    });
  return line;
};
