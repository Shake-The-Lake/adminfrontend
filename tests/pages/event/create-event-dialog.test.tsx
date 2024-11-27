import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { describe, it, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateEventDialog from '../../../src/pages/event/create-event-dialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCreateEvent = {
  mutate: vi.fn(),
  isSuccess: false,
  data: null,
};
vi.mock('../../../src/queries/event', () => ({
  useCreateEvent: () => mockCreateEvent,
}));

describe('CreateEventDialog', () => {
  const queryClient = new QueryClient();

  const renderComponent = () => {
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <CreateEventDialog />
        </QueryClientProvider>
      </Router>
    );
  };

  it('navigates to the event page on successful creation', async () => {
    mockCreateEvent.isSuccess = true;
    mockCreateEvent.data = { id: 1 };

    renderComponent();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/event/1');
    });
  });

  it('renders the event form', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /event.triggerLabel/i })).toBeInTheDocument();
  });
});