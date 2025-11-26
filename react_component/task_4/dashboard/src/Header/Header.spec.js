import { render, screen } from '@testing-library/react';
import Header from './Header';

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
});
