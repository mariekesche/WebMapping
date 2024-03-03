let map = L.map('map').setView([58.373523, 26.716045], 12)

const osm =
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenStreetMap contributors',
})

osm.addTo(map)

// add geoJSON layer
async function addGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    L.choropleth(data, {
        valueProperty: 'OBJECTID',
        scale: ['#ffffff', '#ff9900'],
        steps: 5,
        mode: 'q',
        style: {
            color: '#fff',
            weight: 2,
            fillOpacity: 0.8,
    },
    onEachFeature: function (feature, layer) {
            layer.bindPopup('Value: ' + feature.properties.OBJECTID)
        },
    }).addTo(map)
}

addGeoJson('geojson/tartu_city_districts_edu.geojson')

// default map settings
function defaultMapSettings() {
    map.setView([58.373523, 26.716045], 12)
    }