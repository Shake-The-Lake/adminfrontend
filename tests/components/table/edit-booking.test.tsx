import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import EditBookingTableCell from '../../../src/components/table/edit-booking';
import { QueryClient, QueryClientProvider, type UseMutationResult } from '@tanstack/react-query';
import { type BookingDto } from '../../../src/models/api/booking.model';


describe('EditBookingTableCell', () => {

  const booking: BookingDto = {
    id: 1,
    person: {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
    },
    isRider: true,
    pagerNumber: '123',
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
              <EditBookingTableCell
                booking={booking}
                deleteMutation={mockDeleteMutation}
              />
            </tr>
          </tbody>
        </table>
      </QueryClientProvider>
    );
  };

  it('renders the EditBookingTableCell component', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /delete booking/i })).toBeInTheDocument();
  });

  it('calls deleteMutation when delete button is clicked', async () => {
    renderComponent();

    const deleteButton = screen.getByRole('button', { name: /delete booking/i });
    fireEvent.click(deleteButton);

    expect(mockDeleteMutation.mutateAsync).toHaveBeenCalledWith(booking.id);
  });
});