import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../../src/components/animations/loading';
import { describe, it } from 'vitest';

describe('LoadingSpinner', () => {
  it('renders the spinner when isLoading is true', () => {
    render(<LoadingSpinner isLoading={true} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('does not render the spinner when isLoading is false', () => {
    render(<LoadingSpinner isLoading={false} />);

    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});