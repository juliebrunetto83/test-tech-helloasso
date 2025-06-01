import { readFileSync } from "fs";
import { join } from "path";
import { Category, EventDto } from '~/types/event';

export default defineEventHandler((event) => {
	try {
		const { name, categories } = getQuery(event);

		const filePath = join(process.cwd(), "data.json");
		const data = readFileSync(filePath, "utf-8");
		let events = JSON.parse(data) as Array<EventDto>;
		if (name && typeof name === 'string') {
			events = events.filter((event) => event.title.toLowerCase().includes(name.toLowerCase()));
		}
		if(categories && typeof categories === 'string') {
			const categoriesList = categories.split(',')
			events = events.filter((event) => categoriesList.includes(event.category));
		}
		return events
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: "Erreur lors de la lecture des données",
		});
	}
});
