import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StlFilter, { StlFilterOptions } from '../../../src/components/data-table/stl-filter';
import { StlFilterParams } from '../../../src/models/api/search.model';
import { vi } from 'vitest';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});
vi.mock('../../../src/config/firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'test-user' },
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  },
}));
vi.mock('../../../src/queries/shared', () => ({
  mutationKeyGenerator: vi.fn().mockReturnValue('key'),
  getBaseQueryKey: vi.fn().mockReturnValue('key'),
}));

const mockParams: StlFilterParams = {
  onSearchTermChange: vi.fn(),
  onActivityTypeChange: vi.fn(),
  onBoatChange: vi.fn(),
  onFromChange: vi.fn(),
  onToChange: vi.fn(),
  boatId: 1,
  from: '2021-01-01',
  to: '2021-12-31',
  searchTerm: '',
};

const queryClient = new QueryClient();

describe('StlFilter', () => {
  const renderWithQueryClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    );
  };

  it('renders search term input when SearchTerm option is provided', () => {
    renderWithQueryClient(<StlFilter options={StlFilterOptions.SearchTerm} params={mockParams} />);
    expect(screen.getByLabelText('search')).toBeInTheDocument();
  });

  it('renders activity type select when ActivityType option is provided', () => {
    renderWithQueryClient(<StlFilter options={StlFilterOptions.ActivityType} params={mockParams} />);
    expect(screen.getByText('activityType.title')).toBeInTheDocument();
  });

  it('renders boat select when Boat option is provided', () => {
    renderWithQueryClient(<StlFilter options={StlFilterOptions.Boat} params={mockParams} />);
    expect(screen.getByText('boat.title')).toBeInTheDocument();
  });

  it('renders time range inputs when TimeRange option is provided', () => {
    renderWithQueryClient(<StlFilter options={StlFilterOptions.TimeRange} params={mockParams} />);
    expect(screen.getByLabelText('from')).toBeInTheDocument();
    expect(screen.getByLabelText('to')).toBeInTheDocument();
  });

  it('calls onSearchTermChange when search term is changed', () => {
    renderWithQueryClient(<StlFilter options={StlFilterOptions.SearchTerm} params={mockParams} />);
    const input = screen.getByLabelText('search');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockParams.onSearchTermChange).toHaveBeenCalledWith('test');
  });

});