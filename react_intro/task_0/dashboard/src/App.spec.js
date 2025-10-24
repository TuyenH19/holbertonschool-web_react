import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('renders h1 element with School Dashboard text', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders correct text content in app-body p element', () => {
    render(<App />);
    const bodyText = screen.getByText(/login to access the full dashboard/i);
    expect(bodyText).toBeInTheDocument();
  });

  test('renders correct text content in app-footer p element', () => {
    render(<App />);
    const footerText = screen.getByText(/copyright 2025 - holberton school/i);
    expect(footerText).toBeInTheDocument();
  });

  test('renders img element with holberton logo alt text', () => {
    render(<App />);
    const image = screen.getByAltText(/holberton logo/i);
    expect(image).toBeInTheDocument();
  });
});