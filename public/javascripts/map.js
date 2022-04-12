let xhttp = new XMLHttpRequest();

xhttp.addEventListener("load",success);
xhttp.addEventListener("error",error);
xhttp.open("GET", "/mapViewOut", true);
xhttp.send();

function success(){
  let data = JSON.parse(xhttp.response);

  
  function getColor(d){
    return  d > 7500  ? '#99000d' :
            d > 6500  ? '#cb181d' :
            d > 5400  ? '#ef3b2c' :
            d > 4300  ? '#fb6a4a' :
            d > 3200  ? '#fc9272' :
            d > 2100  ? '#fcbba1' :
            d > 1000  ? '#fee0d2' :
                        '#fff5f0';
  }


  map = L.map('map').setView([42.3601, -71.0589],12);
      // load a tile layer
  L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
  {
    attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
    maxZoom: 17,
    minZoom: 9
  }).addTo(map);
  var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
    let temp;
    if(props!=undefined){
      temp = props['DISTRICT'];
    }
    for(const elm of data){
      if(elm['district']==temp){
        temp = elm['count'];
      }
    }
		this._div.innerHTML = '<h4>District Crime</h4>' +  (props ?
			'<b>' + props.NAME + '</b><br />' + temp + " Crimes" : 'Hover over a district');
	};

	info.addTo(map);

  function highlightFeature(e) {
		var layer = e.target;
		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}
  function resetHighlight(e) {
		info.update();
	}

  function districtClick(e) {
    console.log(e['target']['feature']['properties']['ID'])
  }

  let counter  = 0;
  var districts = new L.GeoJSON.AJAX("json/Police_Districts.geojson",{
    
    
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
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: districtClick
      });
      
    }
  });
  
  districts.addTo(map); 
}
function error(){
  console.log(xhttp.readyState);
  console.log(xhttp.status);
}




