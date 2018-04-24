import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

export default class Map3DBuilding extends React.Component {
  componentDidMount(){
mapboxgl.accessToken = 'pk.eyJ1IjoibXVzZTAxMDYiLCJhIjoiY2pnZDd3b2M0MzI5djJ4dDVpdmFnY21haCJ9.xCVdNIPD47HDzReeIFXIMA';
var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-116.23, 39.54],
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6,
    hash: true,
    container: 'map'
});

map.on('load', function() {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': 'red',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId);
});
}

  render(){
    return(
      <div className="container">
        <div id='map'></div>
      </div>
     
    )
  }
}
