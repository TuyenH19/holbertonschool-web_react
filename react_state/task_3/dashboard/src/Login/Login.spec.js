import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('renders 2 input tags and 2 label tags', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('verify that the submit button is disabled by default', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    expect(submitButton).toBeDisabled();
  });

  test('verify that the button becomes enabled only after both the Email and Password inputs meet the required criteria', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Initially button should be disabled
    expect(submitButton).toBeDisabled();

    // Type only email (valid) - button should still be disabled
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(submitButton).toBeDisabled();

    // Type only password (valid) but clear email - button should be disabled
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(submitButton).toBeDisabled();

    // Type invalid email with valid password - button should be disabled
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(submitButton).toBeDisabled();

    // Type valid email with short password (< 8 chars) - button should be disabled
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(submitButton).toBeDisabled();

    // Type valid email and valid password (>= 8 chars) - button should be enabled
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(submitButton).toBeEnabled();

    // Clear email - button should be disabled again
    fireEvent.change(emailInput, { target: { value: '' } });
    expect(submitButton).toBeDisabled();

    // Restore valid email - button should be enabled again
    fireEvent.change(emailInput, { target: { value: 'user@domain.com' } });
    expect(submitButton).toBeEnabled();
  });

  test("logIn method prop is correctly called with the user's email and password when the login form is submitted", () => {
    const mockLogIn = jest.fn();
    render(<Login logIn={mockLogIn} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    // Type valid email and password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Verify logIn was called with correct email and password
    expect(mockLogIn).toHaveBeenCalledTimes(1);
    expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});