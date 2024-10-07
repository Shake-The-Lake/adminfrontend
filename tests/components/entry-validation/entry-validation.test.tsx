import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EntryValidation from '../../../src/components/entry-validation/entry-validation';
import { vi } from 'vitest';
import EntryValidationForm from '../../../src/components/forms/entry-validation';

// Mock the EntryValidationForm component
vi.mock('../forms/entry-validation', () => ({
  __esModule: true,
  default: vi.fn(({ onSubmit }) => (
    <form onSubmit={onSubmit}>
      <input name="code" placeholder="Enter code" />
      <button type="submit">Submit</button>
    </form>
  )),
  entryValidationSchema: vi.fn(),
}));

describe('EntryValidation', () => {
  it('renders the component with the correct title and description', () => {
    render(<EntryValidation />);
    expect(screen.getByText('Entry Validation Data')).toBeInTheDocument();
    expect(screen.getByText(/Enter the entry validation data for the event/i)).toBeInTheDocument();
  });

  it('renders the EntryValidationForm component', () => {
    render(<EntryValidation />);
    expect(screen.getByText('Export to QR Code')).toBeInTheDocument();
  });

  it('renders the Export to QR Code button', () => {
    render(<EntryValidation />);
    expect(screen.getByText('Export to QR Code')).toBeInTheDocument();
  });
});