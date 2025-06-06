export enum Category {
	SPORT = 'sport',
	SHOWS = 'spectacles',
	WORKSHOPS = 'ateliers',
	CONCERTS = 'concerts'
}


export type EventDto = {
	"id": number;
	"title": string,
	"coords": { "lat": number, "lng": number },
	"address": string,
	"description": string,
	"category": Category
}
