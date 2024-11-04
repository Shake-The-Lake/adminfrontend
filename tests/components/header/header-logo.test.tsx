import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import HeaderLogo from '../../../src/components/header/header-logo';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../src/components/icons/shake-the-lake-icon', () => ({
  __esModule: true,
  default: () => <div data-testid="shake-the-lake-icon" />,
}));

describe('HeaderLogo', () => {
  it('renders the ShakeTheLakeIcon component', () => {
    render(
      <Router>
        <HeaderLogo hasLink={true} />
      </Router>
    );

    expect(screen.getByTestId('shake-the-lake-icon')).toBeInTheDocument();
  });

  it('renders the link with the correct text', () => {
    render(
      <Router>
        <HeaderLogo hasLink={true} />
      </Router>
    );

    expect(screen.getByText('shakeTheLake')).toBeInTheDocument();
  });

  it('renders the link with pointer events enabled when hasLink is true', () => {
    render(
      <Router>
        <HeaderLogo hasLink={true} />
      </Router>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).not.toHaveStyle('pointer-events: none');
  });

  it('renders the link with pointer events disabled when hasLink is false', () => {
    render(
      <Router>
        <HeaderLogo hasLink={false} />
      </Router>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveStyle('pointer-events: none');
  });
});