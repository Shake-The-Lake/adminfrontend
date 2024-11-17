import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { describe, it } from 'vitest';

jest.mock('../src/config/firebaseConfig', () => ({
	auth: {
		signInWithEmailAndPassword: jest.fn(),
		createUserWithEmailAndPassword: jest.fn(),
		signOut: jest.fn(),
		onAuthStateChanged: jest.fn(),
	},
}));

describe('A truthy statement', () => {
	it('renders the App component', () => {
		render(<App />);
	});
});
