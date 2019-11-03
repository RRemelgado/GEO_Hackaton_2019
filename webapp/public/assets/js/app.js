var map, featureList, datasearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  //map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

// Slider
var rangeSlider = document.getElementById('slider-range');

noUiSlider.create(rangeSlider, {
    connect: 'lower',
    start: [10],
    format: wNumb({
      decimals: 0
    }),
    range: {
        'min': [0],
        'max': [100]
    }
});

var rangeSliderValueElement = document.getElementById('slider-range-value');

rangeSlider.noUiSlider.on('update', function (values, handle) {
    rangeSliderValueElement.innerHTML = values[handle]+"%";
    $("input#groundwaterProbability").val(rangeSlider.noUiSlider.get());
});


function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();

  /* Loop through maessig layer and add only features which are in the map bounds */
  maessig.eachLayer(function (layer) {
    if (map.hasLayer(dataLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/drop.png"></td><td class="feature-name">' + layer.feature.properties.spotname + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  //maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});
var usgsImagery = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //maxZoom: 15,
  id: 'christianlanger.lin45e75',
  accessToken: 'pk.eyJ1IjoiY2hyaXN0aWFubGFuZ2VyIiwiYSI6InJOMFAxS00ifQ.tt_H4EfT3ccRSPrkD0KKRQ',
  attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>, &copy; <a href="https://www.openstreetmap.org/about/">OpenStreetMap</a>, <a href="https://apps.mapbox.com/feedback/?owner=mapbox&id=satellite-v9&access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg">Improve this map</a>, &copy; <a href="https://www.digitalglobe.com/">DigitalGlobe</a>'
});

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

// var boroughs = L.geoJson(null, {
//   style: function (feature) {
//     return {
//       color: "black",
//       fill: false,
//       opacity: 1,
//       clickable: false
//     };
//   },
//   onEachFeature: function (feature, layer) {
//     boroughSearch.push({
//       name: layer.feature.properties.BoroName,
//       source: "Boroughs",
//       id: L.stamp(layer),
//       bounds: layer.getBounds()
//     });
//   }
// });
// $.getJSON("data/boroughs.geojson", function (data) {
//   boroughs.addData(data);
// });

//Create a color dictionary based off of subway route_id
// var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
//     "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
//     "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
//     "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
//     "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
//     "Q":"#ffff00", "R":"#ffff00" };

// var subwayLines = L.geoJson(null, {
//   style: function (feature) {
//       return {
//         color: subwayColors[feature.properties.route_id],
//         weight: 3,
//         opacity: 1
//       };
//   },
//   onEachFeature: function (feature, layer) {
//     if (feature.properties) {
//       var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
//       layer.on({
//         click: function (e) {
//           $("#feature-title").html(feature.properties.Line);
//           $("#feature-info").html(content);
//           $("#featureModal").modal("show");

//         }
//       });
//     }
//     layer.on({
//       mouseover: function (e) {
//         var layer = e.target;
//         layer.setStyle({
//           weight: 3,
//           color: "#00FFFF",
//           opacity: 1
//         });
//         if (!L.Browser.ie && !L.Browser.opera) {
//           layer.bringToFront();
//         }
//       },
//       mouseout: function (e) {
//         subwayLines.resetStyle(e.target);
//       }
//     });
//   }
// });
// $.getJSON("data/subways.geojson", function (data) {
//   subwayLines.addData(data);
// });

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});


// Leaflet heat map from ground water points
$.getJSON("data/data.json",function(data){
    var locations = data.map(function(groundwater) {
      // the heatmap plugin wants an array of each location
      var location = groundwater.geometry.coordinates.reverse();
      location.push(7.0);
      return location; // e.g. [50.5, 30.5, 0.2], // lat, lng, intensity
    });

    var heat = L.heatLayer(locations, { 
      radius: 25,
      blur: 5
    });
    map.addLayer(heat);
  });


/* Empty layer placeholder to add to layer control for listening when to add/remove maessig to markerClusters layer */
var dataLayer = L.geoJson(null);
var maessig = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: dropIcon,
      title: feature.properties.spotname,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {

    //fetch images from JSON and save into bootstrap gallery slider
    var i;
    var image = '';

    for (i = 0; i < feature.properties.images.path.length; i++) {
      if (i == 0){
        image += '<div class="active item" data-slide-number='+i+'><img src="./data/uploads/' + feature.properties.images.path[i] + '"></div>'
      } else {
        image += '<div class="item" data-slide-number='+i+'><img src="./data/uploads/' + feature.properties.images.path[i] + '"></div>'
      }
    };

    if (image.length > 0) {
      image += "<a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left'></span></a><a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right'></span></a></div>";
    } else {
      image += "</div>";
    }

    var content = "";

    if (!feature.date == "") {
      content += "<center><img src='./assets/img/spots/farmer.jpg' width='140' height='140' border='0' class='img-circle'></a><h3 class='media-heading'>"+ feature.properties.firstname + " " + feature.properties.lastname + " <small>"+ feature.properties.country +"</small></h3><span class='label label-info'>"+ feature.properties.company +"</span></center><hr><p class='date-string'>Ground water point submitted on: "+ feature.date.split("T")[0] + " at " + feature.date.substring(11, 16) + " by <a href='mailto:"+feature.properties.email+"'>"+ feature.properties.firstname + " " + feature.properties.lastname + "</a></p>";
    }
    
      content += "<h4>Details of the ground water point</h4><table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.spotname + "</td></tr>" + "<tr><th>Location</th><td>" + feature.geometry.coordinates[0] + ", "+ feature.geometry.coordinates[1]+ "</td></tr>";

    if (feature.date == "") {
      content += "<tr><th>Land cover</th><td>"+ feature.properties.landCover +"</td></tr><tr><th>Max. Temperature</th><td>"+feature.properties.temperatureMax+"°</td></tr><tr><th>Soil depth</th><td>"+feature.properties.soilDepth+"cm</td></tr><tr><th>Max Precipitation</th><td>"+feature.properties.precipitationMax+"mm</td></tr>";
    } 
    content += "<tr><th>Ground water probability</th><td><h4><span class='label label-info'>"+feature.properties.groundwaterProbability +"%</span></h4></td></tr></table><br><div class='carousel slide' id='myCarousel'><div class='carousel-inner'>"+image+"</div>";
      
      layer.on({
        click: function (e) {
          $("#feature-title").html("<i class='fa fa-map-marker'></i> " + feature.properties.spotname);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/drop.png"></td><td class="feature-name">' + layer.feature.properties.spotname + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      datasearch.push({
        name: layer.feature.properties.spotname,
        firstname: layer.feature.properties.firstname,
        lastname: layer.feature.properties.lastname,
        source: "maessig",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/data.json", function (data) {
  maessig.addData(data);
  map.addLayer(dataLayer);
});



map = L.map("map", {
  zoom: 6,
  center: [14.813503, 103.745760],
  layers: [usgsImagery, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {

  if (e.layer === dataLayer) {
    markerClusters.addLayer(maessig);
    syncSidebar();
  }

});

map.on("overlayremove", function(e) {

  if (e.layer === dataLayer) {
    markerClusters.removeLayer(maessig);
    syncSidebar();
  }

});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by Team iDiv for the GEO Hack 2019 | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);



var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Grey map": cartoLight,
  "Satellite map": usgsImagery
};

var groupedOverlays = {
  "Ground water locations": {
    "<img src='assets/img/drop.png' width='24' height='28'>&nbsp;Ground water points": dataLayer
  }
  // "Reference": {
  //   "Boroughs": boroughs,
  //   "Subway Lines": subwayLines
  // }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to boroughs bounds */
  //map.fitBounds(boroughs.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  // var boroughsBH = new Bloodhound({
  //   name: "Boroughs",
  //   datumTokenizer: function (d) {
  //     return Bloodhound.tokenizers.whitespace(d.name);
  //   },
  //   queryTokenizer: Bloodhound.tokenizers.whitespace,
  //   local: boroughSearch,
  //   limit: 10
  // });


  var dataBH = new Bloodhound({
    name: "maessig",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: datasearch,
    limit: 10
  });

  // var geonamesBH = new Bloodhound({
  //   name: "GeoNames",
  //   datumTokenizer: function (d) {
  //     return Bloodhound.tokenizers.whitespace(d.name);
  //   },
  //   queryTokenizer: Bloodhound.tokenizers.whitespace,
  //   remote: {
  //     url: "https://secure.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
  //     filter: function (data) {
  //       return $.map(data.geonames, function (result) {
  //         return {
  //           name: result.name + ", " + result.adminCode1,
  //           lat: result.lat,
  //           lng: result.lng,
  //           source: "GeoNames"
  //         };
  //       });
  //     },
  //     ajax: {
  //       beforeSend: function (jqXhr, settings) {
  //         settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
  //         $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
  //       },
  //       complete: function (jqXHR, status) {
  //         $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
  //       }
  //     }
  //   },
  //   limit: 10
  // });
  //boroughsBH.initialize();
  dataBH.initialize();
  //geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "maessig",
    displayKey: "name",
    source: dataBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/drop.png' width='24' height='28'>&nbsp;Ground water points</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>Author: {{firstname}} {{lastname}}</small>"].join(""))
    }
  }).on("typeahead:selected", function (obj, datum) {
    // if (datum.source === "Boroughs") {
    //   map.fitBounds(datum.bounds);
    // }
    if (datum.source === "maessig") {
      if (!map.hasLayer(dataLayer)) {
        map.addLayer(dataLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    // if (datum.source === "GeoNames") {
    //   map.setView([datum.lat, datum.lng], 14);
    // }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}


var dropIcon = L.icon({
    iconUrl: 'assets/img/drop.png',

    iconSize:     [38, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// Initialise the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

markerClusters.addLayer(editableLayers);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var options = {
    position: 'bottomright',
    draw: {
        polyline: false,
        polygon: false,
        circle: false,
        rectangle: false,
        marker: {
          icon: dropIcon
        }
    },
    edit: {
        featureGroup: editableLayers 
    }
};

var drawControl = new L.Control.Draw(options);

L.drawLocal.draw.handlers.marker.tooltip.start = "Add a ground water point";
L.drawLocal.edit.handlers.edit.tooltip.text = "Drag ground water point to edit its location";

map.addControl(drawControl);

  
map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    editableLayers.addLayer(layer);

    if (type === 'marker') {

      var curPos = layer.getLatLng(); 
      document.querySelector('#lat').value = curPos.lat;
      document.querySelector('#lon').value = curPos.lng;
      //document.querySelector('#lon').value = curPos.lng;

    }

    $("#submitDataModal").modal("show");

});


map.on('draw:edited', function (e) {
    // Update db to save latest changes.
    var layers = e.layers;
    
    layers.eachLayer(function(layer) {
        document.querySelector('#lat').value = layer.getLatLng().lat;
        document.querySelector('#lon').value = layer.getLatLng().lng;
    });
    $("#submitDataModal").modal("show");
});



var markerDrawer = new L.Draw.Marker(map, {
  icon: dropIcon   
});

// Click handler for you button to start drawing markers
$("#submit-data-btn").click(function() {
  //$("#submitDataModal").modal("show");
   markerDrawer.enable();
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

// Click handler for you button to start editing markers
$("#cancel-data-btn").click(function() {
  $("#submitDataModal").modal("hide");
});


/*
We want to preview images, so we need to register the Image Preview plugin
*/
// FilePond.registerPlugin(
  
//   // encodes the file as base64 data
//   FilePondPluginFileEncode,
  
//   // validates the size of the file
//   FilePondPluginFileValidateSize,
  
//   // corrects mobile image orientation
//   FilePondPluginImageExifOrientation,
  
//   // previews dropped images
//   FilePondPluginImagePreview
// );

// // Select the file input and use create() to turn it into a pond
// FilePond.create(
//   document.querySelector('input.filepond')
// );

$("#file-input").fileinput();

