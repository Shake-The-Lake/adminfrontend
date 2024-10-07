import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../../../src/components/footer/Footer';

// Mock the LanguageSelector component
vi.mock('./language-selector', () => ({
  __esModule: true,
  default: () => <div>Language Selector</div>,
}));

// Mock the iconPaths constant
vi.mock('../../constants', () => ({
  __esModule: true,
  iconPaths: {
    tiAndM: 'path/to/tiAndM.png',
  },
}));

describe('Footer', () => {
  it('renders the component with the correct elements', () => {
    render(<Footer />);

    const logo = screen.getByAltText('ti&m Logo');
    expect(logo).toBeInTheDocument();

    expect(screen.getByLabelText('Language Selector')).toBeInTheDocument();
  });
});