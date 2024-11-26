import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import EditTimeSlotTableCell from '../../../src/components/table/edit-time-slot-table-cell';
import { QueryClient, QueryClientProvider, type UseMutationResult } from '@tanstack/react-query';
import { TimeSlotType, type TimeSlotDto } from '../../../src/models/api/time-slot.model';
import { BoatDto } from '../../../src/models/api/boat.model';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        'Invalid time': 'Invalid time',
        'Failed to commit': 'Failed to commit',
      },
    },
  },
});
describe('EditTimeSlotTableCell', () => {
  const mockTimeSlot: TimeSlotDto = {
    id: 1,
    bookings: [],
    availableSeats: 0,
    seatsRider: 0,
    seatsViewer: 0,
    availableRiderSeats: 0,
    availableViewerSeats: 0,
    status: TimeSlotType.AVAILABLE
  };

  vi.mock('../../../src/queries/shared', () => ({
    mutationKeyGenerator: vi.fn().mockReturnValue('key'),
  }));

  const mockBoat: BoatDto = {
    id: 1,
    name: 'Boat 1',
    type: '',
    seatsRider: 0,
    seatsViewer: 0,
    operator: '',
    availableFrom: '',
    availableUntil: ''
  };

  const mockDeleteMutation = {
    mutateAsync: vi.fn().mockResolvedValue({}),
  } as unknown as UseMutationResult<any, Error, number>;

  const queryClient = new QueryClient();

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <table>
          <tbody>
            <tr>
              <EditTimeSlotTableCell
                timeSlot={mockTimeSlot}
                deleteMutation={mockDeleteMutation}
                boat={mockBoat}
                eventId={0} />
            </tr>
          </tbody>
        </table>
      </QueryClientProvider>
    );
  };

  it('renders the EditTimeSlotTableCell component', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: /delete time slot/i })).toBeInTheDocument();
  });

  it('calls delete mutation when delete button is clicked', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /delete time slot/i }));
    expect(mockDeleteMutation.mutateAsync).toHaveBeenCalledWith(mockTimeSlot.id);
  });
});