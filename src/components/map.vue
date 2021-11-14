<template>
  <div class="map-container">
    <div id="map" />
    <p v-if="coords">Координаты выбранной области: {{ coords }}</p>
  </div>
</template>

<script>
import store from "@/store/index"

export default {
  name: "Map",
  props: {
    selectedRegion: null,
  },
  data() {
    return {
      map: null,
      coords: null,
      icon: L.icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2.rc.2/images/marker-icon.png",
        iconSize: [27, 40],
      }),
      editableLayers: null,
      drawPluginOptions: null,
    }
  },
  methods: {
    setCoords(region) {
      this.coords = region
      this.map.panTo(new L.LatLng(...region))
      L.marker(region, { icon: this.icon }).addTo(this.map)
    },
  },
  watch: {
    selectedRegion: function (region) {
      this.setCoords(region)
    },
    coords: function (coords) {
      store.set("account/coords", coords)
    },
  },
  mounted() {
    const center = [56.6316, 47.886178]
    this.map = L.map("map").setView(center, 11)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(this.map)

    L.marker(center, { icon: this.icon }).addTo(this.map)

    this.editableLayers = new L.FeatureGroup()
    this.map.addLayer(this.editableLayers)

    this.drawPluginOptions = {
      position: "topright",
      draw: {
        polygon: true,
        polyline: false,
        circle: true,
        rectangle: true,
        marker: false,
        edit: {
          featureGroup: this.editableLayers,
          remove: true,
        },
      },
    }

    const drawControl = new L.Control.Draw(this.drawPluginOptions)

    this.map.addControl(drawControl)

    this.map.on("draw:created", (e) => {
      const type = e.layerType
      this.layer = e.layer
      this.coords = e.layer._latlngs
      this.editableLayers.addLayer(this.layer)
    })

    this.setCoords(store.get("account/coords"))
  },
}
</script>

<style>
.map-container {
  width: 565px;
  margin-left: 3rem;
}
#map {
  height: 400px;
  max-width: 565px;
  width: 100%;
}
</style>
