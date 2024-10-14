import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import EditBookingTableCell from '../../../src/components/table/edit-booking';
import { type UseMutationResult } from '@tanstack/react-query';
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

  const deleteMutation = {
    mutateAsync: vi.fn().mockResolvedValue({}),
  } as unknown as UseMutationResult<any, Error, number>;

  it('renders the EditBookingTableCell component', () => {
    render(
      <Router>
        <EditBookingTableCell booking={booking} deleteMutation={deleteMutation} />
      </Router>
    );
    expect(screen.getByRole('button', { name: /delete booking/i })).toBeInTheDocument();
  });

  it('calls deleteMutation when delete button is clicked', async () => {
    render(
      <Router>
        <EditBookingTableCell booking={booking} deleteMutation={deleteMutation} />
      </Router>
    );

    const deleteButton = screen.getByRole('button', { name: /delete booking/i });
    fireEvent.click(deleteButton);

    expect(deleteMutation.mutateAsync).toHaveBeenCalledWith(booking.id);
  });
});