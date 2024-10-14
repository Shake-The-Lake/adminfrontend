import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StlDialog from '../../../src/components/dialog/stl-dialog';
import { vi } from 'vitest';
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
      },
    },
  },
});

describe('StlDialog', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    triggerLabel: 'Open Dialog',
    children: <div>Dialog Content</div>,
    onClose: vi.fn(),
    onOpen: vi.fn(),
  };

  const renderComponent = (props = {}) => {
    return render(<StlDialog {...defaultProps} {...props} />);
  };

  it('renders the trigger button with the correct label', () => {
    renderComponent();
    expect(screen.getByTitle('Open Dialog')).toBeInTheDocument();
  });

  it('opens the dialog when the trigger button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByTitle('Open Dialog'));
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('calls onOpen when the dialog is opened', () => {
    renderComponent();
    fireEvent.click(screen.getByTitle('Open Dialog'));
    expect(defaultProps.onOpen).toHaveBeenCalled();
  });

  it('calls onClose when the cancel button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByTitle('Open Dialog'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders the save button when formId is provided', () => {
    renderComponent({ formId: 'testForm' });
    fireEvent.click(screen.getByTitle('Open Dialog'));
    expect(screen.getByText('save')).toBeInTheDocument();
  });

  it('does not render the save button when formId is not provided', () => {
    renderComponent();
    fireEvent.click(screen.getByTitle('Open Dialog'));
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });
});