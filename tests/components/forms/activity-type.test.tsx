import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { type UseMutationResult } from '@tanstack/react-query';
import { defaultLocalizedStringDto } from '../../../src/models/api/localized-string';
import { ActivityTypeDto } from '../../../src/models/api/activity-type.model';
import ActivityTypeForm from '../../../src/components/forms/activity-type';

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string) => key,
  }),
}));

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
}));

vi.mock('../common/mutation-toaster', () => ({
  MutationToaster: () => <div data-testid="mutation-toaster" />,
}));

vi.mock('../animations/page-transition-fade-in', () => ({
  PageTransitionFadeIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-transition-fade-in">{children}</div>
  ),
}));

describe('ActivityTypeForm', () => {
  const mockMutation = {
    mutateAsync: vi.fn(),
    isLoading: false,
    isError: false,
    isSuccess: false,
    reset: vi.fn(),
  } as unknown as UseMutationResult<any, Error, ActivityTypeDto>;

  const defaultModel: ActivityTypeDto = {
    id: 0,
    name: defaultLocalizedStringDto,
    description: defaultLocalizedStringDto,
    checklist: defaultLocalizedStringDto,
    icon: '',
    eventId: 0,
  };

  it('renders the form with all fields', () => {
    render(
      <ActivityTypeForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    expect(screen.getByPlaceholderText('activityType.nameEnglish')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('activityType.descEnglish')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('activityType.checklistEnglish')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    render(
      <ActivityTypeForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('activityType.nameEnglish'), {
      target: { value: 'Test Activity' },
    });
    fireEvent.change(screen.getByPlaceholderText('activityType.descEnglish'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByPlaceholderText('icon'), {
      target: { value: 'test-icon' },
    });
    fireEvent.change(screen.getByPlaceholderText('activityType.checklistEnglish'), {
      target: { value: 'Test Checklist' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockMutation.mutateAsync).toHaveBeenCalled();
    });
  });

  it('displays validation errors', async () => {
    render(
      <ActivityTypeForm
        model={defaultModel}
        mutation={mockMutation}
        isCreate={true}
      />
    );

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText('name')).toHaveClass('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
    });
  });
});