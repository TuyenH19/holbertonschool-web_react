import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

const originalConsoleLog = console.log;

describe('Notifications Component', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  test('renders the notifications title', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(<Notifications />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('renders exactly 3 notification items', () => {
    render(<Notifications />);
    const notificationItems = screen.getAllByRole('listitem');
    expect(notificationItems).toHaveLength(3);
  });

  test('logs to console when close button is clicked', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications />);
    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(spy).toHaveBeenCalledWith('Close button has been clicked');
    spy.mockRestore();
  });
});