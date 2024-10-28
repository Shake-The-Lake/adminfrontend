import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import ErrorPage from '../../src/pages/error-page';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations = {
        'messages.pageErrorOops': 'Oops! Something went wrong.',
        'messages.pageErrorNotFound': 'The page you are looking for was not found.',
        'messages.page404NavigateHome': 'You can navigate back to the home page',
        'home': 'Home',
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: () => ({
      status: 404,
    }),
    isRouteErrorResponse: (error: any) => error && error.status,
  };
});

vi.mock('../../src/components/icons/shake-the-lake-icon', () => ({
  __esModule: true,
  default: () => <div data-testid="shake-the-lake-icon" />,
}));

describe('ErrorPage', () => {
  it('renders the error status and messages', () => {
    render(
      <Router>
        <ErrorPage />
      </Router>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('The page you are looking for was not found.')).toBeInTheDocument();
  });

  it('renders the ShakeTheLakeIcon component', () => {
    render(
      <Router>
        <ErrorPage />
      </Router>
    );

    expect(screen.getByTestId('shake-the-lake-icon')).toBeInTheDocument();
  });

  it('renders the home link with correct text', () => {
    render(
      <Router>
        <ErrorPage />
      </Router>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders the 404 specific message', () => {
    render(
      <Router>
        <ErrorPage />
      </Router>
    );
  });
});