<template>
  <div id="map"/>
</template>

<script setup lang="ts">
import leaflet from "leaflet";
import 'leaflet/dist/leaflet.css';
import { onMounted } from "vue";

onMounted(() => {
  const map = leaflet
      .map("map")
      .setView([48.8566, 2.3522], 19);

  leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
});

</script>

<style scoped>
#map {
  width: 50vw;
  height: 100vh;
  overflow: hidden;
}
</style>
