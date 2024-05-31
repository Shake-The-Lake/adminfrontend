import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {describe, expect, it} from 'vitest';

describe('A truthy statement', () => {
	it('should be equal to 2', () => {
		expect(1 + 1).toEqual(2);
	});
	it('renders the App component', () => {
		render(<App />);

		// Screen.debug(); // Prints out the jsx in the App component unto the command line
	});
});
