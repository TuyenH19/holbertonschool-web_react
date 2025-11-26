import React, { Component } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WithLogging from './WithLogging';

describe('WithLogging HOC', () => {
  // Create a mock component to wrap with WithLogging
  class MockAppComponent extends Component {
    render() {
      return <h1>Hello from Mock App Component</h1>;
    }
  }

  // Wrap the mock component with WithLogging HOC
  const MockAppComponentWithLogging = WithLogging(MockAppComponent);

  test('renders a heading element with the text Hello from Mock App Component', () => {
    render(<MockAppComponentWithLogging />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello from Mock App Component');
  });

  test('logs component mount and unmount to console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    const { unmount } = render(<MockAppComponentWithLogging />);
    
    // Check mount log (may be called twice due to StrictMode)
    expect(consoleSpy).toHaveBeenCalledWith('Component MockAppComponent is mounted');
    
    unmount();
    
    // Check unmount log (may be called twice due to StrictMode)
    expect(consoleSpy).toHaveBeenCalledWith('Component MockAppComponent is going to unmount');
    
    consoleSpy.mockRestore();
  });

  test('HOC displayName is set correctly', () => {
    expect(MockAppComponentWithLogging.displayName).toBe('WithLogging(MockAppComponent)');
  });
});
