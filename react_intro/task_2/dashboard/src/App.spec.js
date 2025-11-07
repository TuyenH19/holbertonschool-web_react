import { render, screen } from '@testing-library/react'
import App from './App'
import { getCurrentYear, getFooterCopy } from './utils'

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

  test ('getCurrentYear function returns the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(getCurrentYear()).toBe(currentYear);
  });

  test ('getFooterCopy returns correct string based on isIndex parameter', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('App component renders 2 input elements (one for email and the other for password)', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('App component renders 2 label elements with the text Email and Password)', () => {
    render(<App />);
    const emailLabel = screen.getByLabelText(/email:/i);
    const passwordLabel = screen.getByLabelText(/password:/i);
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('App component renders a button with the text OK', () => {
    render(<App />);
    const okButton = screen.getByRole('button', { name: /ok/i });
    expect(okButton).toBeInTheDocument();
  });
});
