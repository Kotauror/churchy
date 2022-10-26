### showing buildings markers on zoom in

This snippet has been removed from `ChurchyMap/index.tsx` as there are only a few buildings in the DB atm.

````typescript
// analysedAreaLine.bindTooltip("granica obszaru poddanego analizie");

var buildingMarkers = buildings.map(building => {
  var marker = L.marker(building.coordinates);
  marker.on("click", function() {
    console.log(building.name);
  });
  return marker;
});

var buildingsLayer = L.layerGroup(buildingMarkers);

map.on("zoom", function(e) {
  if (map.getZoom() >= 16) {
    buildingsLayer.addTo(map);
  } else {
    map.removeLayer(buildingsLayer);
  }
});
````
