import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import LoginPage from '../../src/pages/login-page';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../src/components/header/header-logo', () => ({
  __esModule: true,
  default: () => <div>HeaderLogo</div>,
}));

vi.mock('../../src/components/forms/login', () => ({
  __esModule: true,
  default: () => <div>LoginForm</div>,
}));

describe('LoginPage', () => {
  it('renders the HeaderLogo component', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByText('HeaderLogo')).toBeInTheDocument();
  });

  it('renders the LoginForm component', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByText('LoginForm')).toBeInTheDocument();
  });

  it('renders the login heading', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});