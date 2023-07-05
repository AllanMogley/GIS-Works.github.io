let map = null

//Function to intialize map layer
function setupMap () {
    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

setupMap()
//Set a custom marker with a pop up

var myIcon = L.icon({
    iconUrl: 'DATA/icons8-homer-simpson-50.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    
});

var marker = L.marker([15.307045, -4.322447], {icon: myIcon}).addTo(map);
marker.bindPopup("<b>dooh!</b><br>Click on the circles to learn more.").openPopup();

//set sequential colors for symbology
let breaks = [-Infinity, 3767, 7674, 24403, 78501, Infinity]
let colors = ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15']


function stat_color(d) {
    for(let i = 0; i < breaks.length; i++) {
    if(d > breaks[i] && d <= breaks[i+1]) {
    return colors[i];
        }
    }
}
    

function stat_style(feature) {
    return {
        fillColor: stat_color(feature.properties.Deaths),
        weight: 0.5,
        opacity: 1,
        color: "black",
        fillOpacity: 0.7
    };
}
// Function to highlight a feature on mouseover
function highlight_feature(e) {
    e.target.setStyle({weight: 5, color: "red", fillOpacity: 0.5});
    e.target.bringToFront();
}

function reset_highlight(e) {
    geojson.resetStyle(e.target);
}

fetch("DATA/greatquakes.geojson")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const feature = L.geoJSON(data)//.addTo(map);
        map.fitBounds(feature.getBounds()); // fit the geojson feature to map
        geojson = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            style:stat_style,
            onEachFeature: function (feature, layer) {
                layer.addEventListener("mouseover", highlight_feature);
                layer.addEventListener("mouseout", reset_highlight);

                var strtype = '';
        
                if (feature.properties.mdtype == 0) {
                    strtype = 'aaa';
                } else if (feature.properties.mdtype == 1) {
                    strtype = 'bbb';
                }
        
                layer.bindPopup(
                    '<div class="popup">' +
                    feature.properties.Location + "<br>" +
                    "Deaths:"+" "+feature.properties.Deaths + "<br>" +
                    "Magnitude:"+" "+feature.properties.Mag + "<br>" +
                    "Year:"+" "+feature.properties.Year +
                    '</div>'
                    );
                
            
           }
          
        }).addTo(map);
       
    });

// Create the legend by creating the div html element and assigning the background color
let legend = L.control({position: "bottomleft"});
legend.onAdd = function() {
let div = L.DomUtil.create("div", "legend");
div.innerHTML =
"<b>World's largest earthquakes<br>by number of deaths</b><br>" +
'<small>No of deaths</small><br>' +
'<div style="background-color: #a50f15"></div>78501+<br>' +
'<div style="background-color: #de2d26"></div>24403 - 78501<br>' +
'<div style="background-color: #fb6a4a"></div>7674 - 24403<br>' +
'<div style="background-color: #fcae91"></div>3767 - 7674<br>' +
'<div style="background-color: #fee5d9"></div>0 - 3767<br>';
return div;
};
legend.addTo(map);
