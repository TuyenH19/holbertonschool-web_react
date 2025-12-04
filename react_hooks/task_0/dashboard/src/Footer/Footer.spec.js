import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import AppContext from '../Context/context';

describe('Footer', () => {
  test('renders without crashing', () => {
    const contextValue = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      },
      logOut: () => {}
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );
  });

  test('renders the text "Copyright"', () => {
    const contextValue = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      },
      logOut: () => {}
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );
    
    const footerText = screen.getByText(/copyright/i);
    expect(footerText).toBeInTheDocument();
  });

  test('Contact us link is not displayed when user is logged out', () => {
    const contextValue = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      },
      logOut: () => {}
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );

    const contactLink = screen.queryByText(/contact us/i);
    expect(contactLink).not.toBeInTheDocument();
  });

  test('Contact us link is displayed when user is logged in', () => {
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
        <Footer />
      </AppContext.Provider>
    );

    const contactLink = screen.getByText(/contact us/i);
    expect(contactLink).toBeInTheDocument();
  });
});
