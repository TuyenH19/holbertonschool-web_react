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



  test('calls markNotificationAsRead with correct id when clicking on a notification item', () => {
    const markNotificationAsRead = jest.fn();
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New project available' }
    ];
    render(
      <Notifications 
        displayDrawer={true} 
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    const notificationItems = screen.getAllByRole('listitem');
    
    // Click on the first notification (id: 1)
    fireEvent.click(notificationItems[0]);
    expect(markNotificationAsRead).toHaveBeenCalledWith(1);
    
    // Click on the second notification (id: 2)
    fireEvent.click(notificationItems[1]);
    expect(markNotificationAsRead).toHaveBeenCalledWith(2);
  });

  test('does not re-render with PureComponent when props are shallowly equal', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const markNotificationAsRead = jest.fn();
    
    const { rerender } = render(
      <Notifications 
        displayDrawer={true} 
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    
    const initialItems = screen.getAllByRole('listitem');
    expect(initialItems).toHaveLength(2);
    expect(initialItems[0]).toHaveTextContent('New course available');
    
    // Re-render with same props (PureComponent should prevent re-render)
    rerender(
      <Notifications 
        displayDrawer={true} 
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    
    const itemsAfterUpdate = screen.getAllByRole('listitem');
    expect(itemsAfterUpdate).toHaveLength(2);
    expect(itemsAfterUpdate[0]).toHaveTextContent('New course available');
  });

  test('re-renders with PureComponent when notifications array reference changes', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' }
    ];
    
    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={notifications} />
    );
    
    let items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    
    // Add a notification (new array reference)
    const notificationsWithNew = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New project available' }
    ];
    
    rerender(<Notifications displayDrawer={true} notifications={notificationsWithNew} />);
    
    items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
    
    // Remove a notification (new array reference)
    const notificationsWithRemoved = [
      { id: 1, type: 'default', value: 'New course available' }
    ];
    
    rerender(<Notifications displayDrawer={true} notifications={notificationsWithRemoved} />);
    
    items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
  });

  test('re-renders when displayDrawer prop changes', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' }
    ];
    
    const { rerender } = render(
      <Notifications displayDrawer={false} notifications={notifications} />
    );
    
    let drawer = screen.queryByText(/here is the list of notifications/i);
    expect(drawer).not.toBeInTheDocument();
    
    // Change displayDrawer prop
    rerender(
      <Notifications displayDrawer={true} notifications={notifications} />
    );
    
    drawer = screen.getByText(/here is the list of notifications/i);
    expect(drawer).toBeInTheDocument();
  });

  test('clicking on the menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' }
    ];
    
    render(
      <Notifications 
        displayDrawer={false} 
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
    );
    
    const menuItem = screen.getByText(/your notifications/i);
    fireEvent.click(menuItem);
    
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  test('clicking on the close button calls handleHideDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' }
    ];
    
    render(
      <Notifications 
        displayDrawer={true} 
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});