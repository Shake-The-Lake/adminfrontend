import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import HeaderDefault from '../../../src/components/header/header-default';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../src/components/header/header-logo', () => ({
  __esModule: true,
  default: () => <div>HeaderLogo</div>,
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('HeaderDefault', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the HeaderLogo component', () => {
    render(
      <Router>
        <HeaderDefault />
      </Router>
    );

    expect(screen.getByText('HeaderLogo')).toBeInTheDocument();
  });

  it('renders the events button with correct text', () => {
    render(
      <Router>
        <HeaderDefault />
      </Router>
    );

    expect(screen.getByText('events')).toBeInTheDocument();
  });

  it('navigates to the home page when the events button is clicked', () => {
    render(
      <Router>
        <HeaderDefault />
      </Router>
    );

    const button = screen.getByText('events');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});