import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../../../src/components/footer/footer';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        'Invalid time': 'Invalid time',
        'Failed to commit': 'Failed to commit',
        'delete': 'Delete',
        'timeSlot.edit': 'Edit Time Slot',
        'timeSlot.editDescription': 'Edit the details of the time slot',
        'Open Dialog': 'Open Dialog',
        'cancel': 'Cancel',
        'Save': 'Save',
        'Footer': 'Footer',
        'Language': 'Language',
      },
    },
  },
});

vi.mock('./language-selector', () => ({
  __esModule: true,
  default: () => <div>Language Selector</div>,
}));

vi.mock('../../constants', () => ({
  __esModule: true,
  iconPaths: {
    tiAndM: 'path/to/tiAndM.png',
  },
}));

describe('Footer', () => {
  it('renders the component with the correct elements', () => {
    render(<Footer />);

    const logo = screen.getByAltText('ti&m Logo');
    expect(logo).toBeInTheDocument();

    expect(screen.getByLabelText('Language Selector')).toBeInTheDocument();
  });
});