mapboxgl.accessToken = 'pk.eyJ1IjoiYWxwYWNhZnVyIiwiYSI6ImNqMmk1ZHd3NDAwd3czM21lZmUwcGpyNHoifQ.SgF7QZMZRGoHfA7S_zUV1g';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/alpacafur/ck7w6pnax02td1imtdjnhlkb3',
  center: [-96.694651, 38.606100],
  zoom: 3.5
});

document.getElementById("close").addEventListener("click", ()=>{
  document.getElementById("banner").style.display="none";
})

/*
4 statuses:
decided_to_keep
considering
partial_removal
removed
*/

const status = ["get", "status"]

map.on('load', function() {
  map.addSource('sro-officers', {
    type: 'geojson',
    data: '/sro-officers/features.geojson',
    cluster: true,
    clusterMaxZoom: 12, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    clusterProperties: {
      'decided_to_keep': ['any', ['==', status, "decided_to_keep"]],
      'considering': ['any', ['==', status, "considering"]],
      'partial_removal': ['any', ['==', status, "partial_removal"]],
      'removed': ['any', ['==', status, "removed"]],
    }
  });

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'sro-officers',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        "match",
        ['+', ['case', ["get", "decided_to_keep"], 1, 0], ['case', ["get", "considering"], 2, 0], ['case', ["get", "partial_removal"], 4, 0], ['case', ["get", "removed"], 8, 0]],
        1,
        '#660e1e',
        2,
        '#875114',
        3,
        '#773019',
        4,
        '#b79921',
        8,
        '#6af438',
        9,
        '#68812B',
        10,
        '#79A326',
        11,
        '#727123',
        12,
        '#91C72D',
        15,
        '#837b23',
        '#330066'
      ],
      'circle-radius': 18,
      'circle-stroke-width': 2,
      'circle-stroke-color': "#000"
    }
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'sro-officers',
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
    source: 'sro-officers',
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
    source: 'sro-officers',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': [
        "match",
        ['get','status'],
        "decided_to_keep",
          '#660e1e',
        "considering",
          '#875114',
        "partial_removal",
          '#b79921',
        "removed",
          '#6af438',
        '#ffffff'
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
    map.getSource('sro-officers').getClusterExpansionZoom(
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
    let notes = e.features[0].properties.notes;
    notes = notes ? "<br><b>Notes: </b>" + notes : ""
    let meal = e.features[0].properties['breakfast-and-lunch'] === 1 ? `<span style="color:#005cc6">Breakfast and Lunch<span>` : `<span style="color:#f46966">Dinner</span>`

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<b>${name}</b><br><b>${meal}</b>`+notes)
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
