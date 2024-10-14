import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { describe, it, vi } from 'vitest';
import { useTranslation } from 'react-i18next';
import StlSelect, { StlSelectDefaultLabel } from '../../../src/components/select/stl-select';

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('StlSelect', () => {
  const defaultProps = {
    value: undefined,
    onValueChange: vi.fn(),
    list: [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
    ],
    defaultLabel: 'Select an option',
    getKey: (item?: { id: string }) => item?.id,
    getLabel: (item?: { name: string }) => item?.name || '',
  };

  it('renders the StlSelect component with default label', () => {
    render(<StlSelect {...defaultProps} />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders the StlSelect component with selected value', () => {
    const props = { ...defaultProps, value: '1' };
    render(<StlSelect {...props} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});