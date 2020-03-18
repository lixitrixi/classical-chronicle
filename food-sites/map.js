mapboxgl.accessToken = 'pk.eyJ1IjoiYWxwYWNhZnVyIiwiYSI6ImNqMmk1ZHd3NDAwd3czM21lZmUwcGpyNHoifQ.SgF7QZMZRGoHfA7S_zUV1g';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/alpacafur/ck7w6pnax02td1imtdjnhlkb3',
  center: [-71.552085, 41.696566],
  zoom: 9
});

document.getElementById("close").addEventListener("click", ()=>{
  document.getElementById("banner").style.display="none";
})

const breakfast_and_lunch = ['match', ['get', 'breakfast-and-lunch'], 1, true, 0, false, false]
const dinner = ['match', ['get', 'dinner'], 1, true, 0, false, false]
// const all_meals = ['all', breakfast_and_lunch, dinner]

map.on('load', function() {
  map.addSource('food-sites', {
    type: 'geojson',
    data: '/food-sites/features.geojson',
    cluster: true,
    clusterMaxZoom: 12, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    clusterProperties: {
      'breakfast-and-lunch': ['any', breakfast_and_lunch],
      'dinner': ['any', dinner]
    }
  });

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'food-sites',
    filter: ['has', 'point_count'],
    paint: {
      // 'circle-color': '#b50ef2',
      'circle-color': [
        "match",
        ['+', ['case', ['get', 'breakfast-and-lunch'], 1, 0], ['case', ['get', 'dinner'], 2, 0]],
        1,
        '#005cc6',
        2,
        '#f46966',
        3,
        '#855da3',
        '#00ff00'
      ],
      'circle-radius': 18,
      'circle-stroke-width': 2,
      'circle-stroke-color': "#000"
    }
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'food-sites',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-allow-overlap': true
    },
    paint: {
      "text-color":'#ffffff'
    }
  });

  map.addLayer({
    id: 'unclustered-label',
    type: 'symbol',
    source: 'food-sites',
    filter: ['!', ['has', 'point_count']],
    layout: {
      'text-field': '{name}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-anchor': 'top',
    },
    paint: {
      "text-color":'#000',
      'text-translate':[0,10]
    }
  });

  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'food-sites',
    filter: ['!', ['has', 'point_count']],
    paint: {
      // 'circle-color': "#b50ef2",
      'circle-color': [
        "match",
        ['get','breakfast-and-lunch'],
        1,
        '#005cc6',
        0,
        '#f46966',
        '#00ff00'
      ],
      'circle-radius': 7,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#000'
    }
  });

  // inspect a cluster on click
  map.on('click', 'clusters', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('food-sites').getClusterExpansionZoom(
      clusterId,
      function(err, zoom) {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        });
      }
    );
  });

  // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.
  map.on('click', 'unclustered-point', function(e) {

    let coordinates = e.features[0].geometry.coordinates.slice();
    let name = e.features[0].properties.name;
    let hours = e.features[0].properties.time;
    let notes = e.features[0].properties.notes;
    notes = notes ? "<br><b>Notes: </b>" + notes : ""
    let start_date = e.features[0].properties.start_date ? `<br><b style="color:#b57327">Starts: ${e.features[0].properties.start_date}</b>` : "";
    let meal = e.features[0].properties['breakfast-and-lunch'] === 1 ? `<span style="color:#005cc6">Breakfast and Lunch<span>` : `<span style="color:#f46966">Dinner</span>`

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<b>${name}</b><br><b>Hours: </b><span>${hours}</span><br><b>${meal}</b>`+notes+start_date)
      .addTo(map);
  });

  map.on('mouseenter', 'clusters', function() {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'clusters', function() {
    map.getCanvas().style.cursor = '';
  });
  map.on('mouseenter', 'unclustered-point', function() {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'unclustered-point', function() {
    map.getCanvas().style.cursor = '';
  });
});
