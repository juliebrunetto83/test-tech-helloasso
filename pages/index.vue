<script setup lang="ts">
import { findEventByLocalisation } from '~/utils/findEventByLocalisation';
import { Category, type EventDto } from '~/types/event';
import { filterEmptyParams, isString } from '~/utils/queryParams';

useHead({ title: 'Rechercher un événement' })
const route = useRoute()
const router = useRouter()
const categories = Object.values(Category)

const queryParams = computed(() => ({
  name: isString(route.query.name) ? route.query.name : '',
  categories: isString(route.query.categories) ? [route.query.categories] : filterEmptyParams(route.query.categories),
}))

const { data: events } = await useFetch(() => `/api/events?name=${queryParams.value.name || ''}&categories=${queryParams.value.categories || ''}`)

const eventsListRef = ref<HTMLUListElement | null>(null)
const eventSelected = ref<EventDto | undefined>(undefined)
const formFilter = ref<{ name: string, categories: Array<string> }>({
  name: queryParams.value.name,
  categories: queryParams.value.categories,
})

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
    query: {
      ...route.query,
      name: formFilter.value.name || undefined,
      categories: formFilter.value.categories,
    },
  })
}

</script>
<template>
  <div class="searchEvent">
    <h1>Rechercher un événement</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="eventName">Nom de l'événement</label>
        <input id="eventName" name="eventName" v-model="formFilter.name" type="text"/>
      </div>

      <fieldset>
        <legend>Categories</legend>
        <div v-for="category in categories" :key="category">
          <input type="checkbox" :id="category" :value="category" v-model="formFilter.categories"/>
          <label class="category" :for="category">{{ category }}</label>
        </div>
      </fieldset>

      <button type="submit">Rechercher</button>
    </form>
    <ul ref="eventsListRef">
      <li v-for="event in events" :key="event.title" :id="`event-${event.id.toString()}`" tabindex="-1">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <div class="category">{{ event.category }}</div>
        <p>{{ event.address }}</p>
        <button :aria-label="`Voir sur la carte ${event.title}`" @click="() => onClickEvent(event)">
          Voir sur la carte
        </button>
      </li>
    </ul>
    <ClientOnly>
      <Map
          :events="events || []"
          :onClickEvent="onSelectMapEvent"
          :eventSelectedCoords="eventSelected?.coords"
          :onResetSelectedEvent="onResetSelectedEvent"
      />
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
    padding: 1rem 1.5rem;
    border: 1px solid #8d8d8d;
    border-radius: 0.5rem;
    display: grid;
    gap: 0.75rem;

    & fieldset {
      display: flex;
      gap: 1rem;
      width: fit-content;
    }
  }

  & ul {
    grid-area: listEvents;
    overflow: scroll;
    height: 100%;

    & li:focus {
      border: 2px #262626 solid;
    }
  }

  & .category {
    text-transform: capitalize;
  }
}
</style>
