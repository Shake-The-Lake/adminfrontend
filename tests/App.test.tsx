import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { describe, it, vi } from 'vitest';

vi.mock('../src/config/firebaseConfig', async (importOriginal) => {
	return {
		getAuth: () => ({
			signInWithEmailAndPassword: vi.fn(),
			createUserWithEmailAndPassword: vi.fn(),
			signOut: vi.fn(),
			onAuthStateChanged: vi.fn(),
		}),
		auth: {
			signInWithEmailAndPassword: vi.fn(),
			createUserWithEmailAndPassword: vi.fn(),
			signOut: vi.fn(),
			onAuthStateChanged: vi.fn(),
		},
	};
});

vi.mock('../src/queries/shared', () => ({
	mutationKeyGenerator: vi.fn().mockReturnValue('key'),
}));

describe('A truthy statement', () => {
	it('renders the App component', () => {
		render(<App />);
	});
});
