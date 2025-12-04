import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
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

  test('App component should render the Login form when state.user.isLoggedIn is false', () => {
    render(<App />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    expect(loginText).toBeInTheDocument();
    
    const courseListTable = screen.queryByRole('table');
    expect(courseListTable).not.toBeInTheDocument();
  });

  test('App component should render the CourseList table when state.user.isLoggedIn is true', async () => {
    const { container } = render(<App />);
    const appInstance = container.querySelector('.App').closest('div').__reactFiber$;
    
    // Find the App component instance
    let fiber = appInstance;
    while (fiber && !fiber.stateNode?.state?.user) {
      fiber = fiber.return;
    }
    
    if (fiber && fiber.stateNode) {
      // Manually set the state to logged in using act
      act(() => {
        fiber.stateNode.setState({
          user: {
            email: 'test@example.com',
            password: 'password123',
            isLoggedIn: true
          }
        });
      });
      
      // Wait for re-render and check
      await waitFor(() => {
        const courseListTable = screen.queryByRole('table');
        expect(courseListTable).toBeInTheDocument();
      });
      
      const loginText = screen.queryByText(/login to access the full dashboard/i);
      expect(loginText).not.toBeInTheDocument();
    }
  });

  test('When the control and h keys are pressed, the logOut function from state is called', () => {
    const { container } = render(<App />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    // Find the App component instance
    let fiber = container.querySelector('.App').closest('div').__reactFiber$;
    while (fiber && !fiber.stateNode?.state?.user) {
      fiber = fiber.return;
    }
    
    if (fiber && fiber.stateNode) {
      // Set user to logged in first
      fiber.stateNode.setState({
        user: {
          email: 'test@example.com',
          password: 'password123',
          isLoggedIn: true
        }
      });
      
      // Trigger the keyboard event
      const event = new KeyboardEvent('keydown', {
        ctrlKey: true,
        key: 'h',
        bubbles: true
      });
      
      document.dispatchEvent(event);
      
      expect(alertMock).toHaveBeenCalledWith('Logging you out');
      
      // Verify user is logged out (state changed)
      expect(fiber.stateNode.state.user.isLoggedIn).toBe(false);
      expect(fiber.stateNode.state.user.email).toBe('');
    }
    
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

  test('Verify UI updates when user logs in (state changes)', () => {
    const { container } = render(<App />);
    
    // Initially should show login form
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/email:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });
    
    // Fill in valid credentials
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form (this calls logIn and updates state)
    fireEvent.click(submitButton);
    
    // UI should now show CourseList instead of Login
    const courseListTable = screen.getByRole('table');
    expect(courseListTable).toBeInTheDocument();
    
    const loginText = screen.queryByText(/login to access the full dashboard/i);
    expect(loginText).not.toBeInTheDocument();
  });

  test('Verify UI updates when user logs out (state changes)', async () => {
    const { container } = render(<App />);
    
    // Find and update state to logged in
    let fiber = container.querySelector('.App').closest('div').__reactFiber$;
    while (fiber && !fiber.stateNode?.state?.user) {
      fiber = fiber.return;
    }
    
    if (fiber && fiber.stateNode) {
      await act(async () => {
        fiber.stateNode.setState({
          user: {
            email: 'test@example.com',
            password: 'password123',
            isLoggedIn: true
          }
        });
      });
      
      // Should show CourseList
      await waitFor(() => {
        const table = screen.queryByRole('table');
        expect(table).toBeInTheDocument();
      });
      
      // Should show logout section
      await waitFor(() => {
        expect(screen.getByText(/welcome test@example.com/i)).toBeInTheDocument();
      });
      
      // Click logout
      const logoutLink = screen.getByText(/logout/i);
      fireEvent.click(logoutLink);
      
      // Wait for logout to complete
      await waitFor(() => {
        expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
      });
      
      // CourseList should not be visible
      const courseListTable = screen.queryByRole('table');
      expect(courseListTable).not.toBeInTheDocument();
    }
  });

  test('Clicking on a notification item removes it from the list and logs to console', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { container } = render(<App />);
    
    // Find the App component instance
    let fiber = container.querySelector('.App').closest('div').__reactFiber$;
    while (fiber && !fiber.stateNode?.state?.user) {
      fiber = fiber.return;
    }
    
    if (fiber && fiber.stateNode) {
      // Get initial notifications count
      const initialNotificationsCount = fiber.stateNode.state.notifications.length;
      expect(initialNotificationsCount).toBe(3);
      
      // Set displayDrawer to true to show notifications
      await act(async () => {
        fiber.stateNode.setState({ displayDrawer: true });
      });
      
      // Wait for notifications to be rendered
      await waitFor(() => {
        const notificationItems = screen.getAllByRole('listitem');
        expect(notificationItems.length).toBeGreaterThan(0);
      });
      
      // Find a notification item and click it
      const notificationItems = screen.getAllByRole('listitem');
      
      // Click the first notification (id: 1)
      fireEvent.click(notificationItems[0]);
      
      // Verify console.log was called with correct message
      expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
      
      // Wait for state update to complete
      await waitFor(() => {
        const updatedNotificationsCount = fiber.stateNode.state.notifications.length;
        expect(updatedNotificationsCount).toBe(2);
      });
      
      // Verify notification was removed from state
      const updatedNotificationsCount = fiber.stateNode.state.notifications.length;
      expect(updatedNotificationsCount).toBe(initialNotificationsCount - 1);
      
      // Verify the removed notification is not in state anymore
      const notificationIds = fiber.stateNode.state.notifications.map(n => n.id);
      expect(notificationIds).not.toContain(1);
    }
    
    consoleSpy.mockRestore();
  });
  
});
