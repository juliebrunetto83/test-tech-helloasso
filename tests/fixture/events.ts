import { Category, type EventDto } from '~/types/event';

export function anEvent(overrides?: Partial<EventDto>): EventDto {
	return {
		id: 1,
		title: "Marathon de Paris",
		coords: { lat: 48.8566, lng: 2.3522 },
		address: '1 Place de l\'Hôtel de Ville, 75004 Paris, France',
		description: "Course mythique à travers les rues de la capitale. Des milliers de coureurs attendus.",
		category: Category.SPORT,
		...overrides
	}
}
