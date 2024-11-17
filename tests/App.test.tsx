import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { describe, it, vi } from 'vitest';

vi.mock('../src/config/firebaseConfig', () => {
	const auth = {
		signInWithEmailAndPassword: vi.fn(),
		createUserWithEmailAndPassword: vi.fn(),
		signOut: vi.fn(),
		onAuthStateChanged: vi.fn(),
	};
	return {
		getAuth: () => auth,
	};
});

describe('A truthy statement', () => {
	it('renders the App component', () => {
		render(<App />);
	});
});
