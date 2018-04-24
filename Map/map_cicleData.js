import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

export default class MapCicleData extends React.Component {
  componentDidMount(){
    mapboxgl.accessToken ='pk.eyJ1IjoibXVzZTAxMDYiLCJhIjoiY2pnZDd3b2M0MzI5djJ4dDVpdmFnY21haCJ9.xCVdNIPD47HDzReeIFXIMA'
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 12,
        center: [-122.447303, 37.753574]
  });
  map.on('load', function () {

    map.addLayer({
        'id': 'population',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://examples.8fgz4egr'
        },
        'source-layer': 'sf2010',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 1.75,
                'stops': [[12, 2], [22, 180]]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': [
                'match',
                ['get', 'ethnicity'],
                'White', '#fbb03b',
                'Black', '#223b53',
                'Hispanic', '#e55e5e',
                'Asian', '#3bb2d0',
                /* other */ '#ccc'
            ]
        }
    });
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
