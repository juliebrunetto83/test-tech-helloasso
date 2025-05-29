import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/vue';
import HomePage from './index.vue';
import '@testing-library/jest-dom/vitest'


test('I see the page title', () => {
	render(HomePage);

	expect(screen.getByRole('heading', { level: 1, name: 'Rechercher un événement' })).toBeVisible();
});
