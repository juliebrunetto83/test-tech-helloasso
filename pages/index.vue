<script setup lang="ts">
useHead({ title: 'Rechercher un événement' })
const { data: events } = await useFetch('/api/events')
const eventsLocalisation = events.value?.map((event) => event.coords)

function onSelectMapEvent({ lat, lng }: { lat: number, lng: number }) {
  console.log({ lat, lng }, 'hello')
}
</script>

<template>
  <div>
    <h1>Rechercher un événement</h1>
    <ul>
      <li v-for="event in events" :key="event.title">
        {{ event.title }}
      </li>
    </ul>
    <ClientOnly>
      <Map :eventsLocalisation="eventsLocalisation" :onClickEvent="onSelectMapEvent"/>
    </ClientOnly>
  </div>
</template>
