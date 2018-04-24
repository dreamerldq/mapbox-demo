import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
const descriptions = [
  '<p>这是剧院</p>',
  '<p>这是酒吧</p>',
  '<p>这是画廊</p>',
  '<p>这是星星</p>',
  '<p>这是星星</p>'
]
export default class MapPopup extends React.Component {
  componentDidMount(){
    mapboxgl.accessToken ='pk.eyJ1IjoibXVzZTAxMDYiLCJhIjoiY2pnZDd3b2M0MzI5djJ4dDVpdmFnY21haCJ9.xCVdNIPD47HDzReeIFXIMA'
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-77.04, 38.907],
      zoom: 11.15
  });
  map.on('load', function () {
    // Add a layer showing the places.
    map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {
                        "description": `${descriptions[0]}`,
                        "icon": "theatre"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.038659, 38.931567]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "description": `${descriptions[0]}`,
                        "icon": "theatre"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.003168, 38.894651]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "description": `${descriptions[1]}`,
                        "icon": "bar"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.090372, 38.881189]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "description": `${descriptions[2]}`,
                        "icon": "art-gallery"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.111561, 38.882342]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "description": `${descriptions[3]}`,
                        "icon": "bicycle"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.052477, 38.943951]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "description": `${descriptions[4]}`,
                        "icon": "star"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.043444, 38.909664]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href=\"http://www.muhsinah.com\" target=\"_blank\" title=\"Opens in a new window\">Muhsinah</a> plays the <a href=\"http://www.blackcatdc.com\">Black Cat</a> (1811 14th Street NW) tonight with <a href=\"http://www.exitclov.com\" target=\"_blank\" title=\"Opens in a new window\">Exit Clov</a> and <a href=\"http://godsilla.bandcamp.com\" target=\"_blank\" title=\"Opens in a new window\">Gods’illa</a>. 9:00 p.m. $12.</p>",
                        "icon": "music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.031706, 38.914581]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "description": "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's  <a href=\"http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show\" target=\"_blank\" title=\"Opens in a new window\"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
                        "icon": "music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.020945, 38.878241]
                    }
                }]
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true
        }
    });
})
map.on('click', 'places', function (e) {
  console.log("点击后显示", e);
  console.log("AAAAA", e.features)
  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.description;

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function () {
  map.getCanvas().style.cursor = '';
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
