import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import AppContext from '../Context/context';

describe('Header', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  test('renders img and h1 tags', () => {
    render(<Header />);
    const image = screen.getByAltText(/holberton logo/i);
    const heading = screen.getByRole('heading', { name: /school dashboard/i });
    
    expect(image).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  test('logoutSection is not rendered when using default context value', () => {
    render(<Header />);
    const logoutSection = screen.queryByText(/welcome/i);
    expect(logoutSection).not.toBeInTheDocument();
  });

  test('logoutSection is rendered when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true
      },
      logOut: () => {}
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );

    const logoutSection = screen.getByText(/welcome test@example.com/i);
    expect(logoutSection).toBeInTheDocument();
  });

  test('clicking logout link calls the logOut spy', () => {
    const logOutSpy = jest.fn();
    const contextValue = {
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true
      },
      logOut: logOutSpy
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );

    const logoutLink = screen.getByText(/logout/i);
    fireEvent.click(logoutLink);

    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
