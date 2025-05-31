<script setup lang="ts">
import { findEventByLocalisation } from '~/utils/findEventByLocalisation';
import type { EventDto } from '~/types/event';

useHead({ title: 'Rechercher un événement' })
const { data: events } = await useFetch('/api/events')
const eventsLocalisation = events.value?.map((event) => ({
  ...event.coords,
  title: event.title,
}))
const eventsListRef = ref<HTMLUListElement | null>(null)
const state = reactive<{ eventSelected?: EventDto }>({ eventSelected: undefined })

function focusEvent(id: string) {
  const eventElement = eventsListRef.value?.querySelector<HTMLLIElement>(`#event-${id}`)
  eventElement?.focus()
}

function onResetSelectedEvent() {
  state.eventSelected = undefined
}

function onSelectMapEvent(coords: { lat: number, lng: number }) {
  if (!events.value) return;
  const event = findEventByLocalisation(events.value, coords)
  if (event) {
    focusEvent(event.id.toString())
  }
}

function onClickEvent(event: EventDto) {
  state.eventSelected = event
}

</script>

<template>
  <div class="searchEvent">
    <div>
      <h1>Rechercher un événement</h1>
      <ul ref="eventsListRef">
        <li v-for="event in events" :key="event.title" :id="`event-${event.id.toString()}`" tabindex="-1">
          <h2>{{ event.title }}</h2>
          <p>{{ event.description }}</p>
          <p>{{ event.category }}</p>
          <button :aria-label="`Voir sur la carte ${event.title}`" @click="() => onClickEvent(event)">
            Voir sur la carte
          </button>
        </li>
      </ul>
    </div>
    <ClientOnly>
      <Map :events="eventsLocalisation" :onClickEvent="onSelectMapEvent"
           :eventSelectedCoords="state.eventSelected?.coords" :onResetSelectedEvent="onResetSelectedEvent"/>
    </ClientOnly>
  </div>
</template>

<style scoped>
.searchEvent {
  display: grid;
  grid-template-columns: auto 50vw;
  gap: 2rem;

  & li:focus {
    border: 2px blue solid
  }
}
</style>
