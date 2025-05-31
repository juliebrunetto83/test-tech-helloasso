<script setup lang="ts">
import leaflet, { marker } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { onMounted } from "vue";
import { KeyBoard } from '~/utils/keyboard';

const ZOOM_FOCUS_EVENT = 12;
const ZOOM_DEFAULT = 5;
const MAX_ZOOM = 19;
const COORD_DEFAULT_PARIS: leaflet.LatLngExpression = [48.8566, 2.3522];
const MAP_ID = 'map';

const { events, onClickEvent, eventSelectedCoords, onResetSelectedEvent } = defineProps<{
  events?: Array<{
    title: string,
    lat: number,
    lng: number,
  }>,
  onClickEvent: (eventLocalisation: { lat: number, lng: number }) => void,
  eventSelectedCoords?: { lat: number, lng: number },
  onResetSelectedEvent: () => void,
}>()

let map: leaflet.Map
let marks: Array<leaflet.Marker> = []

onMounted(() => {
  map = leaflet
      .map(MAP_ID)
      .setView(COORD_DEFAULT_PARIS, ZOOM_DEFAULT);
  leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: MAX_ZOOM }).addTo(map);

  events?.map((point) => {
    const mark = marker({ lat: point.lat, lng: point.lng }, { alt: point.title }).addTo(map)
    marks.push(mark)
    mark.addEventListener('keydown', function (event) {
      if (event.originalEvent.key === KeyBoard.ENTER) {
        mark.fire('click');
      }
    });
    mark.on('click', () => onClickEvent({ lat: point.lat, lng: point.lng }))
  });
});


watch(
    () => (eventSelectedCoords),
    (newEventSelectedCoords) => {
      if (newEventSelectedCoords) {
        const mark = marks.find(mark =>
            mark.getLatLng().lat === newEventSelectedCoords.lat
            && mark.getLatLng().lng === newEventSelectedCoords.lng,
        )
        mark?.getElement()?.focus()
        map.flyTo([newEventSelectedCoords.lat, newEventSelectedCoords.lng], ZOOM_FOCUS_EVENT);
        onResetSelectedEvent()
      }
    },
)

</script>

<template>
  <div :id="MAP_ID"/>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
