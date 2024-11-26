import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { type UseMutationResult } from '@tanstack/react-query';
import { EventDto } from '../../../src/models/api/event.model';
import EventForm from '../../../src/components/forms/event';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string) => key,
  }),
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

describe('EventForm', () => {
  const mockMutation = {
    mutateAsync: vi.fn(),
    isLoading: false,
    isError: false,
    isSuccess: false,
    reset: vi.fn(),
  } as unknown as UseMutationResult<any, Error, EventDto>;

  const defaultModel: EventDto = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    customerBarcode: '',
    employeeBarcode: ''
  };

  it('renders the form with all fields', () => {
    render(
      <EventForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    expect(screen.getByPlaceholderText('event.placeholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('description')).toBeInTheDocument();
    expect(screen.getByLabelText('event.date')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    render(
      <EventForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('event.placeholder'), {
      target: { value: 'Test Event' },
    });
    fireEvent.change(screen.getByPlaceholderText('description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText('event.date'), {
      target: { value: '2023-10-10' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockMutation.mutateAsync).toHaveBeenCalled();
    });
  });

  it('displays validation errors', async () => {
    render(
      <EventForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText('title')).toHaveClass('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
    });
  });
});