import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import HomePage from '../../src/pages/home-page';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../src/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
  }),
}));

vi.mock('../../src/pages/event/event-list', () => ({
  __esModule: true,
  default: () => <div>EventList</div>,
}));

describe('HomePage', () => {

  it('renders the EventList component if authenticated', () => {
    vi.mock('../../src/AuthContext', () => ({
      useAuth: () => ({
        isAuthenticated: true,
      }),
    }));

    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText('EventList')).toBeInTheDocument();
  });

  it('renders the app name and welcome message', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText('appName')).toBeInTheDocument();
    expect(screen.getByText('welcomeMessage')).toBeInTheDocument();
  });
});