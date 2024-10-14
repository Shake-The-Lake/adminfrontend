import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi, beforeEach } from 'vitest';
import HeaderEvent from '../../../src/components/header/header-event';
import { NavigationStructureContext } from '../../../src/components/navigation/navigation-models';

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the ShakeTheLakeIcon component
vi.mock('../../../src/components/icons/shake-the-lake-icon', () => ({
  __esModule: true,
  default: () => <div>ShakeTheLakeIcon</div>,
}));

// Mock the NavigationMenuItem component
vi.mock('../../../src/components/navigation/navigation-menu-item', () => ({
  __esModule: true,
  default: ({ isMobileView }) => <div>NavigationMenuItem {isMobileView ? 'Mobile' : 'Desktop'}</div>,
}));

// Define mockNavigate outside the describe block
const mockNavigate = vi.fn();

// Partially mock react-router-dom to preserve BrowserRouter
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('HeaderEvent', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the events button with correct text', () => {
    const navigationStructure = [{ link: '/test', name: 'Test' }];
    render(
      <Router>
        <NavigationStructureContext.Provider value={navigationStructure}>
          <HeaderEvent />
        </NavigationStructureContext.Provider>
      </Router>
    );

    expect(screen.getByText('events')).toBeInTheDocument();
  });

  it('navigates to the home page when the events button is clicked', () => {
    const navigationStructure = [{ link: '/test', name: 'Test' }];
    render(
      <Router>
        <NavigationStructureContext.Provider value={navigationStructure}>
          <HeaderEvent />
        </NavigationStructureContext.Provider>
      </Router>
    );

    const button = screen.getByText('events');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});