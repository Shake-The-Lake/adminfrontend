import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { MutationToaster } from '../../../src/components/common/mutation-toaster';
import { vi } from 'vitest';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../src/lib/utils', () => ({
  tryGetErrorMessage: vi.fn((error: Error) => error.message),
}));

describe('MutationToaster', () => {
  let mutationMock;

  beforeEach(() => {
    mutationMock = {
      reset: vi.fn(),
    };
  });

  it('shows success message when mutation is successful', async () => {
    mutationMock.isSuccess = true;
    render(<MutationToaster type="create" mutation={mutationMock} />);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('messages.successCreate');
      expect(mutationMock.reset).toHaveBeenCalled();
    });
  });

  it('shows error message when mutation has an error', async () => {
    const error = new Error('Mutation error');
    mutationMock.isError = true;
    mutationMock.error = error;
    render(<MutationToaster type="update" mutation={mutationMock} />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('messages.errorUpdate', {
        description: 'Mutation error',
      });
      expect(mutationMock.reset).toHaveBeenCalled();
    });
  });

  it('shows error message when error prop is passed', async () => {
    const error = new Error('Direct error prop');
    render(<MutationToaster type="delete" error={error} />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('messages.errorDelete', {
        description: 'Direct error prop',
      });
    });
  });
});