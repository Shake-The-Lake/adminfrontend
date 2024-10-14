import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { type UseMutationResult } from '@tanstack/react-query';
import { BoatDto } from '../../../src/models/api/boat.model';
import BoatForm from '../../../src/components/forms/Boat';

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string) => key,
  }),
}));

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
}));

vi.mock('../common/mutation-toaster', () => ({
  MutationToaster: () => <div data-testid="mutation-toaster" />,
}));

vi.mock('../animations/page-transition-fade-in', () => ({
  PageTransitionFadeIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-transition-fade-in">{children}</div>
  ),
}));

describe('BoatForm', () => {
  const mockMutation = {
    mutateAsync: vi.fn(),
    isLoading: false,
    isError: false,
    isSuccess: false,
    reset: vi.fn(), // Add the reset method to the mock
  } as unknown as UseMutationResult<any, Error, BoatDto>;

  const defaultModel: BoatDto = {
    id: 0,
    name: '',
    type: '',
    seatsRider: 0,
    seatsViewer: 0,
    operator: '',
    slotDurationInMins: 0,
    availableFrom: '',
    availableUntil: '',
    eventId: 0,
    timeSlotIds: [],
    activityTypeId: 0,
  };

  it('renders the form with all fields', () => {
    render(
      <BoatForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    expect(screen.getByPlaceholderText('boat.name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('boat.type')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('boatDriver')).toBeInTheDocument();
    expect(screen.getByTestId('maxSeatsViewers')).toBeInTheDocument();
    expect(screen.getByTestId('availableFrom')).toBeInTheDocument();
    expect(screen.getByTestId('availableUntil')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    render(
      <BoatForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('boat.name'), {
      target: { value: 'Test Boat' },
    });
    fireEvent.change(screen.getByPlaceholderText('boat.type'), {
      target: { value: 'Test Type' },
    });
    fireEvent.change(screen.getByPlaceholderText('boatDriver'), {
      target: { value: 'Test Operator' },
    });
    fireEvent.change(screen.getByTestId('maxSeatsViewers'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByTestId('availableFrom'), {
      target: { value: '08:00' },
    });
    fireEvent.change(screen.getByTestId('availableUntil'), {
      target: { value: '18:00' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockMutation.mutateAsync).toHaveBeenCalled();
    });
  });

  it('displays validation errors', async () => {
    render(
      <BoatForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText('boat.name')).toHaveClass('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
    });
  });
});