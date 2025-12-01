import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom Component', () => {
  test('contains a div with the class bodySectionWithMargin', () => {
    render(
      <BodySectionWithMarginBottom title="Test Title">
        <p>Test content</p>
      </BodySectionWithMarginBottom>
    );
    
    const divWithClass = document.querySelector('.bodySectionWithMargin');
    expect(divWithClass).toBeInTheDocument();
  });

  test('renders the BodySection component', () => {
    render(
      <BodySectionWithMarginBottom title="Test Title">
        <p>Test content</p>
      </BodySectionWithMarginBottom>
    );
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Title');
  });
});
