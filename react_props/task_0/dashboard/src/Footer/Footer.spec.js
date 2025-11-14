import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });

  test('renders the text "Copyright"', () => {
    render(<Footer />);
    const footerText = screen.getByText(/copyright/i);
    
    expect(footerText).toBeInTheDocument();
  });
});
