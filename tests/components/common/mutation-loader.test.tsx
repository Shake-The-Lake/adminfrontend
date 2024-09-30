import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useIsMutating } from '@tanstack/react-query';
import MutationLoader from '../../../src/components/common/mutation-loader';
import { describe, it, vi } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
  useIsMutating: vi.fn(),
}));

describe('MutationLoader', () => {
  it('renders LoadingSpinner when there are ongoing mutations', async () => {
    (useIsMutating as vi.Mock).mockReturnValue(1);

    render(<MutationLoader />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('does not render LoadingSpinner when there are no ongoing mutations', () => {
    (useIsMutating as vi.Mock).mockReturnValue(0);

    render(<MutationLoader />);

    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});