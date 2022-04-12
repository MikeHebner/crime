let xhttp = new XMLHttpRequest();

xhttp.addEventListener("load",success);
xhttp.addEventListener("error",error);
xhttp.open("GET", "/mapViewOut", true);
xhttp.send();

function success(){
  let data = JSON.parse(xhttp.response);
  console.log(data[0]["count"])
  
  function getColor(d){
    return  d > 7000  ? '#a50f15' :
            d > 5000  ? '#de2d26' :
            d > 3500   ? '#fb6a4a' :
            d > 1500   ? '#fcae91' :
                        '#fee5d9';
  }

  console.log(getColor(data[1]["count"]))


  map = L.map('map').setView([42.3601, -71.0589],12);
      // load a tile layer
  L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
  {
    attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
    maxZoom: 17,
    minZoom: 9
  }).addTo(map);
  let counter  = 0;
  var districts = new L.GeoJSON.AJAX("json/Police_Districts.geojson",{
    
    style:{
      fillColor:getColor(data[0]["count"]),
    },
    onEachFeature: function (feature, layer){
      var label = L.marker(layer.getBounds().getCenter(), {
        icon: L.divIcon({
          className: 'label',
          html: (feature.properties.NAME + "--" + feature.properties.ID),
          iconSize: [100, 40]
        })
    
      }).addTo(map);
      layer.setStyle({
        fillColor:getColor(data[counter]["count"]),
        fillOpacity:.75
      });
      counter = counter + 1;
      console.log(label)
      
    }
  });
  
  districts.addTo(map);
}
function error(){
  console.log(xhttp.readyState);
  console.log(xhttp.status);
}




