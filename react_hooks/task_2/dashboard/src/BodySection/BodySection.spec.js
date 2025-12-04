import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BodySection from './BodySection';

describe('BodySection Component', () => {
  test('renders a heading with title prop value', () => {
    render(
      <BodySection title="Test Title">
        <p>Test content</p>
      </BodySection>
    );
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Title');
  });

  test('renders any number of children passed to it', () => {
    render(
      <BodySection title="Multiple Children">
        <p>First child</p>
        <p>Second child</p>
        <p>Third child</p>
        <div>Fourth child</div>
      </BodySection>
    );
    
    const firstChild = screen.getByText('First child');
    const secondChild = screen.getByText('Second child');
    const thirdChild = screen.getByText('Third child');
    const fourthChild = screen.getByText('Fourth child');
    
    expect(firstChild).toBeInTheDocument();
    expect(secondChild).toBeInTheDocument();
    expect(thirdChild).toBeInTheDocument();
    expect(fourthChild).toBeInTheDocument();
  });
});
