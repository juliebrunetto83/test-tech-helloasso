import { readFileSync } from "fs";
import { join } from "path";
import { EventDto } from '~/types/event';

export default defineEventHandler(() => {
	try {
		const filePath = join(process.cwd(), "data.json");
		const data = readFileSync(filePath, "utf-8");
		return JSON.parse(data) as Array<EventDto>;
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: "Erreur lors de la lecture des données",
		});
	}
});
