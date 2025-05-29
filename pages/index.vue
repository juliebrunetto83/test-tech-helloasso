<script setup lang="ts">
useHead({
  title: 'Rechercher un événement',
})
const { data: events } = await useFetch('/api/events')
</script>

<template>
  <h1>Rechercher un événement</h1>
  <ul>
    <li v-for="event in events" :key="event.title">
      {{ event.title }}
    </li>
  </ul>
</template>
