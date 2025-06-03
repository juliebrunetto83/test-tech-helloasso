export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

// TODO (BRUJ 03/06/2025): add test
export function filterEmptyParams(queryParams: Array<string | null> | null): Array<string> {
	return queryParams?.filter((query) => query !== null) || []
}
