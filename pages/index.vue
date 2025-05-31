<script setup lang="ts">
import { findEventByLocalisation } from '~/utils/findEventByLocalisation';

useHead({ title: 'Rechercher un événement' })
const { data: events } = await useFetch('/api/events')
const eventsLocalisation = events.value?.map((event) => event.coords)
const eventsListRef = ref<HTMLUListElement | null>(null)

function onSelectMapEvent(coords: { lat: number, lng: number }) {
  if (!events.value) return;
  const event = findEventByLocalisation(events.value, coords)
  if (event) {
    const id = `#event-${event.id.toString()}`
    const eventElement = eventsListRef.value?.querySelector<HTMLLIElement>(id)
    eventElement?.focus()
  }
}

</script>

<template>
  <div>
    <h1>Rechercher un événement</h1>
    <ul ref="eventsListRef">
      <li v-for="event in events" :key="event.title" :id="`event-${event.id.toString()}`" tabindex="-1">
        {{ event.title }}
      </li>
    </ul>
    <ClientOnly>
      <Map :eventsLocalisation="eventsLocalisation" :onClickEvent="onSelectMapEvent"/>
    </ClientOnly>
  </div>
</template>

<style scoped>
li:focus {
  border: 2px blue solid
}
</style>
