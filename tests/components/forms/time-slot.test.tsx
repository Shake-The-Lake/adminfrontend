import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UseMutationResult } from '@tanstack/react-query';
import { TimeSlotDto } from '../../../src/models/api/time-slot.model';
import TimeSlotForm, { TimeSlotFormProps } from '../../../src/components/forms/time-slot';
import { describe, it, expect, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => { },
  },
}));

vi.mock('../../../src/components/select/activity-type-select', () => ({
  __esModule: true,
  default: (props: any) => (
    <select {...props.field} data-testid="activity-type-select">
      <option value="1">Activity 1</option>
      <option value="2">Activity 2</option>
    </select>
  ),
}));

const mockMutation: UseMutationResult<any, Error, TimeSlotDto> = {
  mutateAsync: vi.fn(),
  isLoading: false,
  isError: false,
  isSuccess: false,
  reset: vi.fn(),
  mutate: vi.fn(),
  status: 'idle',
  data: undefined,
  error: null,
  context: undefined,
  failureCount: 0,
  failureReason: null,
  isPaused: false,
  variables: undefined,
};

const defaultModel: TimeSlotDto = {
  id: 0,
  fromTime: '08:00',
  untilTime: '10:00',
  boatId: 0,
  bookings: [],
  availableSeats: 0,
  seatsRider: 0,
  seatsViewer: 0,
  availableRiderSeats: 0,
  availableViewerSeats: 0,
  status: 'AVAILABLE',
};

const mockOnSuccessfullySubmitted = vi.fn();

const renderComponent = (props: Partial<TimeSlotFormProps> = {}) => {
  return render(
    <TimeSlotForm
      model={defaultModel}
      mutation={mockMutation}
      isCreate={true}
      onSuccessfullySubmitted={mockOnSuccessfullySubmitted}
      {...props}
    />
  );
};

describe('TimeSlotForm', () => {
  it('renders the form fields', () => {
    renderComponent();
    expect(screen.getByLabelText('from')).toBeInTheDocument();
    expect(screen.getByLabelText('to')).toBeInTheDocument();
    expect(screen.getByTestId('activity-type-select')).toBeInTheDocument();
  });

  describe('TimeSlotForm', () => {
    it('renders the form fields', () => {
      renderComponent();
      expect(screen.getByLabelText('from')).toBeInTheDocument();
      expect(screen.getByLabelText('to')).toBeInTheDocument();
      expect(screen.getByTestId('activity-type-select')).toBeInTheDocument();
    });

    it('displays validation errors', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText('from'), {
        target: { value: '' },
      });
      fireEvent.change(screen.getByLabelText('to'), {
        target: { value: '' },
      });

      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(screen.getAllByText('Invalid time')).toHaveLength(2);
      });
    });
  });
});