
map = L.map('map').setView([42.3601, -71.0589],12);
    // load a tile layer
L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
{
  attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
  maxZoom: 17,
  minZoom: 9
}).addTo(map);

var districts = new L.GeoJSON.AJAX("json/Police_Districts.geojson")
districts.addTo(map);

