// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { describe, it, expect, vi } from 'vitest';
// import { useNavigate } from 'react-router-dom';
// import LoginForm from '../../../src/components/forms/Login'; // Adjust the path as necessary
// import { LoginDto } from '../../../src/models/api/login.model';
// import { useAuth } from '../../../src/AuthContext';

// vi.mock('react-i18next', () => ({
//   useTranslation: () => ({
//     i18n: { language: 'en' },
//     t: (key: string) => key,
//   }),
// }));

// vi.mock('@hookform/resolvers/zod', () => ({
//   zodResolver: vi.fn(),
// }));

// vi.mock('sonner', () => ({
//   toast: {
//     error: vi.fn(),
//   },
// }));

// vi.mock('react-router-dom', () => ({
//   useNavigate: vi.fn(),
// }));

// vi.mock('../../AuthContext', () => ({
//   useAuth: vi.fn(),
// }));

// describe('LoginForm', () => {
//   const mockNavigate = vi.fn();
//   const mockLogin = vi.fn();

//   beforeEach(() => {
//     (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
//     (useAuth as vi.Mock).mockReturnValue({ login: mockLogin });
//   });

//   const defaultModel: LoginDto = {
//     username: '',
//     password: '',
//   };

//   it('renders the form with all fields', () => {
//     render(
//       <LoginForm
//         model={defaultModel}
//       />
//     );

//     expect(screen.getByPlaceholderText('login.username')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('login.password')).toBeInTheDocument();
//   });

//   it('submits the form successfully', async () => {
//     render(
//       <LoginForm
//         model={defaultModel}
//       />
//     );

//     fireEvent.change(screen.getByPlaceholderText('login.username'), {
//       target: { value: 'testuser' },
//     });
//     fireEvent.change(screen.getByPlaceholderText('login.password'), {
//       target: { value: 'testpassword' },
//     });

//     fireEvent.submit(screen.getByRole('form'));

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpassword');
//       expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
//     });
//   });

//   it('displays validation errors', async () => {
//     render(
//       <LoginForm
//         model={defaultModel}
//       />
//     );

//     fireEvent.submit(screen.getByRole('form'));

//     await waitFor(() => {
//       expect(screen.getByText('username')).toHaveClass('text-destructive');
//       expect(screen.getByText('password')).toHaveClass('text-destructive');
//     });
//   });
// });