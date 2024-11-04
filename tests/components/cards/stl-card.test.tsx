import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import StlCard from '../../../src/components/cards/stl-card';
import { describe, it, vi } from 'vitest';
import { UseMutationResult } from '@tanstack/react-query';
import { D } from 'vitest/dist/reporters-yx5ZTtEV.js';

vi.mock('path/to/icons', () => ({
  Trash: () => <div data-testid="trash-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
}));

describe('StlCard', () => {
  const props = {
    title: 'Test Title',
    description: 'Test Description',
    link: '/test-link',
    handleDelete: vi.fn(),
  };

  const deleteMutation = {
    mutate: vi.fn(),
  } as unknown as UseMutationResult<any, Error, any>;


  it('renders the card with title, description, and link', () => {
    render(
      <Router>
        <StlCard deleteMutation={deleteMutation}  {...props} />
      </Router>
    );

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
  });

  it('navigates to the correct link when the link is clicked', () => {
    render(
      <Router>
        <StlCard deleteMutation={deleteMutation} {...props} />
      </Router>
    );

    const linkElement = screen.getByTestId('arrow-right-icon');
    expect(linkElement).toHaveAttribute('href', props.link);
  });
});