import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { screen } from '@testing-library/vue';
import HomePage from './index.vue';
import '@testing-library/jest-dom/vitest'
import { mockNuxtImport, renderSuspended } from '@nuxt/test-utils/runtime';
import { anEvent } from '~/tests/fixture/events';
import { Category } from '~/types/event';

const { mockFetch } = vi.hoisted(() => ({
	mockFetch: vi.fn(),
}));

describe('HomePage', () => {
	beforeEach(() => {
		mockNuxtImport('useFetch', () => mockFetch);
	});

	afterEach(() => {
		mockFetch.mockReset();
	});

	it('I see the page title', async () => {
		mockFetch.mockReturnValue({
			data: ref([
				anEvent({
					title: 'Marathon de Paris',
				})]),
		});
		await renderSuspended(HomePage);

		expect(screen.getByRole('heading', { level: 1, name: 'Rechercher un événement' })).toBeVisible();
	});

	it('call api to retrieve events', async () => {
		mockFetch.mockReturnValue({
			data: ref([]),
		});
		await renderSuspended(HomePage);

		expect(mockFetch).toHaveBeenCalledOnce();
	});

	it('I see the list of events', async () => {
		mockFetch.mockReturnValue({
			data: ref([
				anEvent({
					id: 1,
					title: "Marathon de Paris",
					coords: { lat: 48.8566, lng: 2.3522 },
					description: "Course mythique à travers les rues de la capitale. Des milliers de coureurs attendus.",
					address: '1 Place de l’Hôtel de Ville, 75004 Paris, France',
					category: Category.SPORT,
				}),
				anEvent({
					id: 2,
					title: "Festival Jazz à Vienne",
					coords: { lat: 45.516, lng: 4.8757 },
					description: "Grand festival de jazz dans un théâtre antique. Ambiance estivale garantie.",
					address: '20 Rue des Clercs, 38200 Vienne, France',
					category: Category.SHOWS,
				})]),
		});

		await renderSuspended(HomePage);

		expect(screen.getByRole('list')).toBeVisible();
		const eventList = screen.getAllByRole('listitem');
		expect(eventList).toHaveLength(2);
		expect(eventList[0]).toHaveTextContent(/Marathon de Paris/);
		expect(eventList[0]).toHaveTextContent(/Course mythique à travers les rues de la capitale. Des milliers de coureurs attendus./);
		expect(eventList[0]).toHaveTextContent(/sport/);
		expect(eventList[0]).toHaveTextContent(/1 Place de l’Hôtel de Ville, 75004 Paris, France/);

		expect(eventList[1]).toHaveTextContent(/Festival Jazz à Vienne/);
		expect(eventList[1]).toHaveTextContent(/Grand festival de jazz dans un théâtre antique. Ambiance estivale garantie./);
		expect(eventList[1]).toHaveTextContent(/spectacles/);
		expect(eventList[1]).toHaveTextContent(/20 Rue des Clercs, 38200 Vienne, France/);
	});

	it.todo('when i click on see event in map, focus the marker in map');

	describe('Map', () => {
		it.todo('i see markers with label');
		it.todo('when i click on a mark event in map, focus the event information');
		it.todo('when Enter with focus on mark, focus the event information');
	})

	describe('search by event name', ()=>{
		it.todo('call API with the event name')
		it.todo('when query params change, the list is updated')
		it.todo('when query params change, the map is updated')
	})

	describe('search by categories', ()=>{
		it.todo('call API with the categories')
		it.todo('when query params change, the list is updated')
		it.todo('when query params change, the map is updated')
	})
})
