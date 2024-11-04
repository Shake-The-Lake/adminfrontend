import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { describe, it } from 'vitest';

describe('A truthy statement', () => {
	it('renders the App component', () => {
		render(<App />);
	});
});
