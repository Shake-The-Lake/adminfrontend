// Tests/mutation-toaster.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MutationToaster } from '../../../src/components/common/mutation-toaster'; // Adjust the import path as needed
import { toast } from 'sonner';
import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import { type UseMutationResult } from '@tanstack/react-query';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('MutationToaster', () => {
  let mutationMock;

  beforeEach(() => {
    mutationMock = {
      isSuccess: false,
      isError: false,
      error: null,
      reset: vi.fn(),
    } as UseMutationResult<any, Error, any>;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows success message when mutation is successful', async () => {
    mutationMock.isSuccess = true;
    render(<MutationToaster type="create" mutation={mutationMock} />);

    expect(toast.success).toHaveBeenCalledWith('Item was created successfully!');
    expect(mutationMock.reset).toHaveBeenCalled();
  });

  it('shows error message when mutation fails', async () => {
    mutationMock.isError = true;
    mutationMock.error = 'Test error message';

    render(<MutationToaster type="create" mutation={mutationMock} />);

    await waitFor(async () => Promise.resolve());

    expect(toast.error).toHaveBeenCalledWith('There was an error when creating.', {
      description: 'Test error message',
    });
    expect(mutationMock.reset).toHaveBeenCalled();
  });

  it('shows error message when error prop is passed', async () => {
    const errorMock = new Error('Direct error prop');
    render(<MutationToaster type="delete" error={errorMock} />);

    await waitFor(async () => Promise.resolve());

    expect(toast.error).toHaveBeenCalledWith('There was an error when deleting.', {
      description: 'Direct error prop',
    });
  });
});