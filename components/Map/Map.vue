<script setup lang="ts">
import leaflet, { type LeafletMouseEvent, marker } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { onMounted } from "vue";

const { eventsLocalisation, onClickEvent } = defineProps<{
  eventsLocalisation?: Array<{
    lat: number, lng: number,
  }>,
  onClickEvent: (marker: { lat: number, lng: number }) => void,
}>()


onMounted(() => {
  const map: leaflet.Map = leaflet
      .map("map")
      .setView([48.8566, 2.3522], 5);

  leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);

  eventsLocalisation?.map((point) => {
    const mark = marker(point, { bubblingMouseEvents: true }).addTo(map)
    mark.on('click', (event: LeafletMouseEvent) => onClickEvent({
      lat: event.latlng.lat,
      lng: event.latlng.lng,
    }));
  });
});
</script>

<template>
  <div id="map"/>
</template>

<style scoped>
#map {
  width: 50vw;
  height: 100vh;
  overflow: hidden;
}
</style>
