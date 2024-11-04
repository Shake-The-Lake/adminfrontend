import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import NavigationMenuItem from '../../../src/components/navigation/navigation-menu-item';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe('NavigationMenuItem', () => {
  const defaultProps = {
    labelKey: 'testLabel',
    link: '/test-link',
    needsFullMatch: false,
    isMobileView: false,
    icon: undefined,
    subNavigations: [
      {
        labelKey: 'subItem1',
        link: '/sub-item-1',
        needsFullMatch: false,
      },
      {
        labelKey: 'subItem2',
        link: '/sub-item-2',
        needsFullMatch: false,
      },
    ],
  };

  it('renders the NavigationMenuItem component', () => {
    render(
      <Router>
        <NavigationMenuItem {...defaultProps} />
      </Router>
    );

    expect(screen.getByText('testLabel')).toBeInTheDocument();
  });

  it('renders sub-navigation items when clicked', () => {
    render(
      <Router>
        <NavigationMenuItem {...defaultProps} />
      </Router>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('subItem1')).toBeInTheDocument();
    expect(screen.getByText('subItem2')).toBeInTheDocument();
  });

  it('toggles sub-navigation items visibility when button is clicked', () => {
    render(
      <Router>
        <NavigationMenuItem {...defaultProps} />
      </Router>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('subItem1')).toBeInTheDocument();
    expect(screen.getByText('subItem2')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText('subItem1')).not.toBeInTheDocument();
    expect(screen.queryByText('subItem2')).not.toBeInTheDocument();
  });
});