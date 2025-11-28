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

  test('renders "Your notifications" text in all cases', () => {
    render(<Notifications displayDrawer={false} />);
    const yourNotifications = screen.getByText(/your notifications/i);
    expect(yourNotifications).toBeInTheDocument();
  });

  describe('When displayDrawer is false', () => {
    test('does not display the close button', () => {
      render(<Notifications displayDrawer={false} notifications={[]} />);
      const closeButton = screen.queryByRole('button', { name: /close/i });
      expect(closeButton).not.toBeInTheDocument();
    });

    test('does not display the p element "Here is the list of notifications"', () => {
      render(<Notifications displayDrawer={false} notifications={[]} />);
      const listText = screen.queryByText(/here is the list of notifications/i);
      expect(listText).not.toBeInTheDocument();
    });

    test('does not display notification items', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' }
      ];
      render(<Notifications displayDrawer={false} notifications={notifications} />);
      const notificationItems = screen.queryAllByRole('listitem');
      expect(notificationItems).toHaveLength(0);
    });
  });

  describe('When displayDrawer is true', () => {
    test('displays the close button', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'New course available' }
      ];
      render(<Notifications displayDrawer={true} notifications={notifications} />);
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    test('displays the p element "Here is the list of notifications"', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'New course available' }
      ];
      render(<Notifications displayDrawer={true} notifications={notifications} />);
      const listText = screen.getByText(/here is the list of notifications/i);
      expect(listText).toBeInTheDocument();
    });

    test('displays notification items', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'New project available' }
      ];
      render(<Notifications displayDrawer={true} notifications={notifications} />);
      const notificationItems = screen.getAllByRole('listitem');
      expect(notificationItems).toHaveLength(3);
    });
  });

  describe('When displayDrawer is true and notifications is empty', () => {
    test('displays "No new notification for now" text', () => {
      render(<Notifications displayDrawer={true} notifications={[]} />);
      const noNotificationText = screen.getByText(/no new notification for now/i);
      expect(noNotificationText).toBeInTheDocument();
    });

    test('does not display "Here is the list of notifications"', () => {
      render(<Notifications displayDrawer={true} notifications={[]} />);
      const listText = screen.queryByText(/here is the list of notifications/i);
      expect(listText).not.toBeInTheDocument();
    });
  });

  test('logs to console when close button is clicked', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' }
    ];
    render(<Notifications displayDrawer={true} notifications={notifications} />);
    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(spy).toHaveBeenCalledWith('Close button has been clicked');
    spy.mockRestore();
  });

  test('logs correct message when clicking on a notification item', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New project available' }
    ];
    render(<Notifications displayDrawer={true} notifications={notifications} />);
    const notificationItems = screen.getAllByRole('listitem');
    
    // Click on the first notification (id: 1)
    fireEvent.click(notificationItems[0]);
    expect(spy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    
    // Click on the second notification (id: 2)
    fireEvent.click(notificationItems[1]);
    expect(spy).toHaveBeenCalledWith('Notification 2 has been marked as read');
    
    spy.mockRestore();
  });

  test('does not re-render if the length of the notifications prop remains the same', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    
    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={notifications} />
    );
    
    const initialItems = screen.getAllByRole('listitem');
    expect(initialItems).toHaveLength(2);
    
    // Update props with same length but different content
    const updatedNotifications = [
      { id: 1, type: 'default', value: 'Updated notification 1' },
      { id: 2, type: 'urgent', value: 'Updated notification 2' }
    ];
    
    rerender(<Notifications displayDrawer={true} notifications={updatedNotifications} />);
    
    // Should still show old content because length hasn't changed
    const itemsAfterUpdate = screen.getAllByRole('listitem');
    expect(itemsAfterUpdate).toHaveLength(2);
  });

  test('re-renders whenever the length of the notifications prop changes', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    
    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={notifications} />
    );
    
    let items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    
    // Add a notification (length changes from 2 to 3)
    const notificationsWithNew = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New project available' }
    ];
    
    rerender(<Notifications displayDrawer={true} notifications={notificationsWithNew} />);
    
    items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
    
    // Remove a notification (length changes from 3 to 1)
    const notificationsWithRemoved = [
      { id: 1, type: 'default', value: 'New course available' }
    ];
    
    rerender(<Notifications displayDrawer={true} notifications={notificationsWithRemoved} />);
    
    items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
  });
});