export enum Category {
	SPORT = 'sport',
	SHOW = 'spectacles'
}

export type EventDto = {
	"id": number;
	"title": string,
	"coords": { "lat": number, "lng": number },
	"description": string,
	"category": Category
}
