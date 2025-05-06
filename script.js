mapboxgl.accessToken = 'pk.eyJ1Ijoia2lkZ3JhbmRtYSIsImEiOiJjbTcxaXdyYmQwY213MnJvanh4em9lMTF5In0.HNoz7yMV2oamUgpdFCuZ7A';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/kidgrandma/cm749551500l801sle2a5gkeq',
  center: [-79.3832, 43.6532],
  zoom: 10
});

map.on('load', () => {
  map.addSource('hoods', {
    type: 'geojson',
    data: 'neighborhoods.geojson'
  });

  // Fill by region
  map.addLayer({
    id: 'region-fill',
    type: 'fill',
    source: 'hoods',
    paint: {
      'fill-color': [
        'match',
        ['get', 'region'],
        'Etobicoke', '#f94144',
        'North York', '#f3722c',
        'Scarborough', '#f8961e',
        'Downtown', '#43aa8b',
        'West', '#577590',
        'East York', '#277da1',
        '#999' // default
      ],
      'fill-opacity': [
        'case',
        ['==', ['get', 'status'], 'at risk'],
        0.9,
        0.5
      ]
    }
  });

  // Outline
  map.addLayer({
    id: 'region-outline',
    type: 'line',
    source: 'hoods',
    paint: {
      'line-color': '#ffffff',
      'line-width': 0.75
    }
  });

  // Label neighborhoods
  map.addLayer({
    id: 'hood-labels',
    type: 'symbol',
    source: 'hoods',
    layout: {
      'text-field': ['get', 'AREA_NAME'],
      'text-size': 10
    },
    paint: {
      'text-color': '#ffffff'
    }
  });

  // Region markers
  const regions = [
    { name: 'Etobicoke', coords: [-79.6, 43.65] },
    { name: 'North York', coords: [-79.42, 43.75] },
    { name: 'Scarborough', coords: [-79.2, 43.76] },
    { name: 'Downtown', coords: [-79.38, 43.65] },
    { name: 'West', coords: [-79.48, 43.66] },
    { name: 'East York', coords: [-79.34, 43.69] }
  ];

  regions.forEach(region => {
    new mapboxgl.Marker({ color: 'white' })
      .setLngLat(region.coords)
      .setPopup(new mapboxgl.Popup().setText(region.name))
      .addTo(map);
  });
});
