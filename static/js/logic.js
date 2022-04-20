// Create a map object
var myMap = L.map("map", {
  center: [-22.45374327, 15.02020495],
  zoom: 5
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1Ijoic2hyZWVzdGluYSIsImEiOiJjbDF2ejU2MGIybmlnM2ptdDV1anpmNDg0In0.TxozhPWkzWDabi7yumg5Ww"
}).addTo(myMap);

// City marker

var marker = L.marker([-22.45374327, 15.02020495], {
  draggable: false,
  title: "Namibia"
}).addTo(myMap);

// Binding a pop-up to our marker
marker.bindPopup("Namibia");