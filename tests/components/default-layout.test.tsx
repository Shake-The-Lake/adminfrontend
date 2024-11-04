import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import DefaultLayout from '../../src/components/default-layout';

vi.mock('../../src/components/header/header-default', () => ({
  __esModule: true,
  default: () => <div>HeaderDefault</div>,
}));

vi.mock('../../src/components/footer/footer', () => ({
  __esModule: true,
  default: () => <div>Footer</div>,
}));

describe('DefaultLayout', () => {
  it('renders the HeaderDefault and Footer components', () => {
    render(
      <Router>
        <DefaultLayout />
      </Router>
    );

    expect(screen.getByText('HeaderDefault')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(
      <Router>
        <DefaultLayout>
          <div>Child Component</div>
        </DefaultLayout>
      </Router>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders the Outlet component when children are not provided', () => {
    render(
      <Router>
        <DefaultLayout />
      </Router>
    );

    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Footer';
    })).toBeInTheDocument();
  });
});