import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageSelector from '../../../src/components/footer/language-selector';
import { useTranslation } from 'react-i18next';

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  __esModule: true,
  useTranslation: () => ({
    i18n: {
      changeLanguage: vi.fn(),
    },
    t: (key: string) => {
      const translations = {
        'langSwitcher.toggleGerman': 'German',
        'langSwitcher.toggleEnglish': 'English',
        'langSwitcher.toggleSwissGerman': 'Swiss German',
      };
      return translations[key] || key;
    },
  }),
}));

describe('LanguageSelector', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the component with the correct elements', () => {
    render(<LanguageSelector />);

    expect(screen.getByLabelText('German')).toBeInTheDocument();
    expect(screen.getByLabelText('English')).toBeInTheDocument();
    expect(screen.getByLabelText('Swiss German')).toBeInTheDocument();
  });

  it('sets the initial language from localStorage', () => {
    localStorage.setItem('selectedLanguage', 'de');
    render(<LanguageSelector />);

    expect(screen.getByLabelText('German')).toHaveAttribute('aria-pressed', 'true');
  });

  it('changes the language when a toggle button is clicked', async () => {
    render(<LanguageSelector />);

    const germanButton = screen.getByLabelText('German');
    fireEvent.click(germanButton);

    expect(localStorage.getItem('selectedLanguage')).toBe('de');
  });
});