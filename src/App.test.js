import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('starts at home and allows navigation to student dashboard and profile', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /get started/i }));
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /student login/i }));
  expect(screen.getByText('Jaanya Bagdi')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /view profile/i }));
  expect(screen.getByText(/student profile/i)).toBeInTheDocument();
});
