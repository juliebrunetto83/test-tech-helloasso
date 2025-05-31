import { describe, expect, it } from "vitest";
import { anEvent } from '~/tests/fixture/events';
import { Category } from '~/types/event';
import { findEventByLocalisation } from '~/utils/findEventByLocalisation';

describe("findEventByLocalisation", () => {
	it("retrieve event by coordinates", () => {
		const events = [
			anEvent({
				id: 1,
				title: "Marathon de Nantes",
				coords: { lat: 2.3, lng: 2.3522 },
			}),
			anEvent({
				id: 1,
				title: "Marathon de Paris",
				coords: { lat: 48.8566, lng: 2.3522 },
				description: "Course mythique à travers les rues de la capitale. Des milliers de coureurs attendus.",
				category: Category.SPORT,
			}),
			anEvent({
				id: 2,
				title: "Marathon de Bordeaux",
				coords: { lat: 48.8566, lng: 0.2 },
			}),
		]

		expect(findEventByLocalisation(events,{ lat: 48.8566, lng: 2.3522 } )).toStrictEqual({
			id: 1,
			title: "Marathon de Paris",
			coords: { lat: 48.8566, lng: 2.3522 },
			description: "Course mythique à travers les rues de la capitale. Des milliers de coureurs attendus.",
			category: Category.SPORT,
		})
	});
});
