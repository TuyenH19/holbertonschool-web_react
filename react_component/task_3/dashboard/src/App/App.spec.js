import { render, screen } from '@testing-library/react'
import App from './App'
import { getCurrentYear, getFooterCopy } from '../utils/utils'

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

  test('renders 2 label elements with text Email and Password', () => {
    render(<App />);
    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  test('App component renders a button with the text OK', () => {
    render(<App />);
    const okButton = screen.getByRole('button', { name: /ok/i });
    expect(okButton).toBeInTheDocument();
  });

  test('App component should render the Login form when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
    
    const courseListTable = screen.queryByRole('table', { name: /CourseList/i });
    expect(courseListTable).not.toBeInTheDocument();
  });

  test('App component should render the CourseList table when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />);
    const courseListTable = screen.getByRole('table');
    expect(courseListTable).toBeInTheDocument();
    
    const loginText = screen.queryByText(/login to access the full dashboard/i);
    expect(loginText).not.toBeInTheDocument();
  });

  test('When the control and h keys are pressed, the logOut function, passed as a prop, is called once', () => {
    const logOutMock = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<App logOut={logOutMock} />);
    
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true
    });
    
    document.dispatchEvent(event);
    
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalledTimes(1);
    
    alertMock.mockRestore();
  });

  test('Ensure that the alert function is called with the string Logging you out', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<App />);
    
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'h',
      bubbles: true
    });
    
    document.dispatchEvent(event);
    
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    
    alertMock.mockRestore();
  });

  test('Check title "News from school" and paragraph element with text "Holberton School News goes here" are displayed by default', () => {
    render(<App />);
    
    const newsTitle = screen.getByRole('heading', { name: /news from the school/i });
    const newsContent = screen.getByText(/holberton school news goes here/i);
    
    expect(newsTitle).toBeInTheDocument();
    expect(newsContent).toBeInTheDocument();
  });
  
});
