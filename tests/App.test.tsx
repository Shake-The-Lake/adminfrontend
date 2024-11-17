import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { describe, it, vi } from 'vitest';

vi.mock('../src/config/firebaseConfig', async () => {
	const actual = await import('../src/config/firebaseConfig');
	const auth = {
		signInWithEmailAndPassword: vi.fn(),
		createUserWithEmailAndPassword: vi.fn(),
		signOut: vi.fn(),
		onAuthStateChanged: vi.fn(),
	};
	return {
		...actual,
		getAuth: () => auth,
		auth, // Add this line to export auth
	};
});

describe('A truthy statement', () => {
	it('renders the App component', () => {
		render(<App />);
	});
});
