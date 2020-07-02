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

const statuses = {
  decided_to_keep: {color: "#660e1e", text: "Decided to keep SROs in schools"},
  considering: {color: "#875114", text: "Considering removing SROs from schools"},
  partial_removal: {color: "#b79921", text: "Taken some steps to remove SROs from schools"},
  removed: {color: "#51c327", text: "Removed SROs from schools"}
}

const status = ["get", "status"]

map.on('load', function() {
  map.addSource('sro-officers', {
    type: 'geojson',
    data: '/sro-removals/features.geojson',
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
        1, // Decided to keep
        '#8e1515',
        2, // Considering Removal
        '#b76d1a',
        4, // Partial Removal
        '#d2b421',
        8, // Full Removal
        '#6ed04a',
        9,
        '#7e732f',
        10,
        '#939f32',
        11,
        '#917128',
        12,
        '#a0c236',
        13,
        '#9a882b',
        15,
        '#a18226',
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
          '#8e1515',
        "considering",
          '#b76d1a',
        "partial_removal",
          '#d2b421',
        "removed",
          '#6ed04a',
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
    const articleURL = e.features[0].properties.url;
    const article = articleURL ? `<br><a href="${articleURL}" target="_blank">Link to Article</a>` : "";
    const status = statuses[e.features[0].properties.status];
    const summary = e.features[0].properties.summary ? "<br>" + e.features[0].properties.summary : ""
    console.log(status)
    const statusHTML = `<span style="color:${status.color};">${status.text}<span>`

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<b>${name}</b>${summary}<br><b>${statusHTML}</b>`+article)
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
