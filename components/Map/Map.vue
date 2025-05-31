<script setup lang="ts">
import leaflet, { marker } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { onMounted } from "vue";
import { KeyBoard } from '~/utils/keyboard';
import type { EventDto } from '~/types/event';

const ZOOM_FOCUS_EVENT = 12;
const ZOOM_DEFAULT = 5;
const MAX_ZOOM = 19;
const COORD_DEFAULT_PARIS: leaflet.LatLngExpression = [48.8566, 2.3522];
const MAP_ID = 'map';

const { events, onClickEvent, eventSelectedCoords, onResetSelectedEvent } = defineProps<{
  events: Array<EventDto>,
  onClickEvent: (eventLocalisation: { lat: number, lng: number }) => void,
  eventSelectedCoords?: { lat: number, lng: number },
  onResetSelectedEvent: () => void,
}>()

let map: leaflet.Map
let marks: Array<leaflet.Marker> = []

function addMarkerToMap(event: EventDto) {
  const mark = marker({ lat: event.coords.lat, lng: event.coords.lng }, { alt: event.title }).addTo(map)
  marks.push(mark)
  mark.addEventListener('keydown', function (event) {
    if (event.originalEvent.key === KeyBoard.ENTER) {
      mark.fire('click');
    }
  });
  mark.on('click', () => onClickEvent({ lat: event.coords.lat, lng: event.coords.lng }))
}

onMounted(() => {
  map = leaflet
      .map(MAP_ID)
      .setView(COORD_DEFAULT_PARIS, ZOOM_DEFAULT);

  leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: MAX_ZOOM }).addTo(map);

  events.map(addMarkerToMap);
});

watch(() => events,
    (events) => {
      marks = marks.filter((mark) => {
        const markLocalisation = mark.getLatLng()
        const keepMark = events.some((event) => event.coords.lat === markLocalisation.lat && event.coords.lng === markLocalisation.lng)
        if (!keepMark) {
          mark.remove();
        }
        return keepMark
      })

      events.map((event) => {
        const alreadyExists = marks.find((mark) => {
          const markLocalisation = mark.getLatLng();
          return markLocalisation.lat === event.coords.lat && markLocalisation.lng === event.coords.lng;
        });

        if (!alreadyExists) {
          addMarkerToMap(event);
        }
      });
    },
)

watch(
    () => eventSelectedCoords,
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
  height: 100%;
  overflow: hidden;
}
</style>
