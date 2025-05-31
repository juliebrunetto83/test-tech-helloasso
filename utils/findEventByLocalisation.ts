import type { EventDto } from '~/types/event';

export function findEventByLocalisation(events: Array<EventDto>, coord: {
	lng: number,
	lat: number
}): EventDto | undefined {
	return events.find((event) => event.coords.lng == coord.lng && event.coords.lat == coord.lat);
}
