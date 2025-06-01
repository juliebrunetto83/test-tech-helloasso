import { readFileSync } from "fs";
import { join } from "path";
import { EventDto } from '~/types/event';

export default defineEventHandler((event) => {
	try {
		const { name } = getQuery(event);

		const filePath = join(process.cwd(), "data.json");
		const data = readFileSync(filePath, "utf-8");
		const events = JSON.parse(data) as Array<EventDto>;
		if (name && typeof name === 'string') {
			return events.filter((event) => event.title.toLowerCase().includes(name.toLowerCase()));
		}
		return events
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: "Erreur lors de la lecture des données",
		});
	}
});
