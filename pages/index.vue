<script setup lang="ts">
import { findEventByLocalisation } from '~/utils/findEventByLocalisation';
import type { EventDto } from '~/types/event';

useHead({ title: 'Rechercher un événement' })
const route = useRoute()
const router = useRouter()

const queryParams = computed(() => ({
  name: route.query.name,
}))

const { data: events } = await useFetch(() => `/api/events?name=${queryParams.value.name || ''}`)

const eventsListRef = ref<HTMLUListElement | null>(null)
const eventSelected = ref<EventDto | undefined>(undefined)
const formFilter = ref<{ name?: string }>({ name: queryParams.value.name as string || '' })

function focusEvent(id: string) {
  const eventElement = eventsListRef.value?.querySelector<HTMLLIElement>(`#event-${id}`)
  eventElement?.focus()
}

function onResetSelectedEvent() {
  eventSelected.value = undefined
}

function onSelectMapEvent(coords: { lat: number, lng: number }) {
  if (!events.value) return;
  const event = findEventByLocalisation(events.value, coords)

  if (event) {
    focusEvent(event.id.toString())
  }
}

function onClickEvent(event: EventDto) {
  eventSelected.value = event
}

function onSubmit() {
  router.replace({
    path: route.path,
    query: { ...route.query, name: formFilter.value.name },
  })
}

</script>
<template>
  <div class="searchEvent">
    <h1>Rechercher un événement</h1>
    <form @submit.prevent="onSubmit">
      <label for="eventName">Nom de l'événement</label>
      <input id="eventName" name="eventName" v-model="formFilter.name"/>
      <button type="submit">Rechercher</button>
    </form>
    <ul ref="eventsListRef">
      <li v-for="event in events" :key="event.title" :id="`event-${event.id.toString()}`" tabindex="-1">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <p class="category">{{ event.category }}</p>
        <button :aria-label="`Voir sur la carte ${event.title}`" @click="() => onClickEvent(event)">
          Voir sur la carte
        </button>
      </li>
    </ul>
    <ClientOnly>
      <Map :events="events || []" :onClickEvent="onSelectMapEvent"
           :eventSelectedCoords="eventSelected?.coords" :onResetSelectedEvent="onResetSelectedEvent"
           class="map"/>
    </ClientOnly>
  </div>
</template>

<style scoped>
.searchEvent {
  height: 100dvh;
  display: grid;
  grid-template-areas:
  "heading heading"
  "listEvents form"
  "listEvents map";
  grid-template-columns: auto 50vw;
  grid-template-rows: auto auto 1fr;
  gap: 1rem 2rem;
  align-items: flex-start;

  & h1 {
    grid-area: heading;
  }

  & form {
    grid-area: form;
  }

  & ul {
    margin: 0;
    grid-area: listEvents;
    overflow: scroll;
    height: 100%;

    & h2 {
      margin-top: 0;
    }

    & li {
      margin-bottom: 2rem;

      &:focus {
        border: 2px blue solid
      }
    }


    & .category {
      text-transform: capitalize;
    }
  }

  & .map {
    grid-area: map;
  }
}
</style>
