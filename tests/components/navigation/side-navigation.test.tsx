import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import SideNavigation from '../../../src/components/navigation/side-navigation';
import { NavigationStructureContext } from '../../../src/components/navigation/navigation-models';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../src/components/icons/shake-the-lake-icon', () => ({
  __esModule: true,
  default: () => <div>ShakeTheLakeIcon</div>,
}));

vi.mock('../../../src/components/navigation/navigation-menu-item', () => ({
  __esModule: true,
  default: ({ isMobileView }) => <div>NavigationMenuItem Desktop</div>,
}));

describe('SideNavigation', () => {
  const navigationStructure = [
    { labelKey: 'item1', link: '/item1', needsFullMatch: false },
    { labelKey: 'item2', link: '/item2', needsFullMatch: false },
  ];

  it('renders the ShakeTheLakeIcon component', () => {
    render(
      <Router>
        <NavigationStructureContext.Provider value={navigationStructure}>
          <SideNavigation />
        </NavigationStructureContext.Provider>
      </Router>
    );

    expect(screen.getByText('ShakeTheLakeIcon')).toBeInTheDocument();
  });

  it('renders the navigation items', () => {
    render(
      <Router>
        <NavigationStructureContext.Provider value={navigationStructure}>
          <SideNavigation />
        </NavigationStructureContext.Provider>
      </Router>
    );

    expect(screen.getAllByText('NavigationMenuItem Desktop')).toHaveLength(2);
  });

  it('renders the shakeTheLake text', () => {
    render(
      <Router>
        <NavigationStructureContext.Provider value={navigationStructure}>
          <SideNavigation />
        </NavigationStructureContext.Provider>
      </Router>
    );

    expect(screen.getByText('shakeTheLake')).toBeInTheDocument();
  });
});