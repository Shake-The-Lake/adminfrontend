import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import EventDetailLayout from '../../src/components/event-detail-layout';

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string) => key,
  }),
}));

// Mock the useLoaderData hook and include BrowserRouter
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: () => ({ eventId: '1' }),
  };
});

// Mock the useQuery hook
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useQuery: () => ({
      data: { title: 'Event Title' },
    }),
  };
});

// Mock the SideNavigation component
vi.mock('../../src/components/navigation/side-navigation', () => ({
  __esModule: true,
  default: () => <div>SideNavigation</div>,
}));

// Mock the HeaderEvent component
vi.mock('../../src/components/header/header-event', () => ({
  __esModule: true,
  default: () => <div>HeaderEvent</div>,
}));

// Mock the Footer component
vi.mock('../../src/components/footer/footer', () => ({
  __esModule: true,
  default: () => <div>Footer</div>,
}));

describe('EventDetailLayout', () => {
  it('renders the SideNavigation, HeaderEvent, and Footer components', () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<EventDetailLayout />} />
        </Routes>
      </Router>
    );

    expect(screen.getByText('SideNavigation')).toBeInTheDocument();
    expect(screen.getByText('HeaderEvent')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders the event title', () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<EventDetailLayout />} />
        </Routes>
      </Router>
    );

    expect(screen.getByText('Event Title')).toBeInTheDocument();
  });

  it('renders the Outlet component', () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<EventDetailLayout />} />
        </Routes>
      </Router>
    );

    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});