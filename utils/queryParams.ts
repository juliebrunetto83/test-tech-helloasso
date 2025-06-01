export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

export function filterEmptyParams(queryParams: Array<string | null> | null): Array<string> {
	return queryParams?.filter((query) => query !== null) || []
}
