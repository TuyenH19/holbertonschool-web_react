import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  // test('renders li element with blue color and data-notification-type set to default when type prop is "default"', () => {
  //   render(<NotificationItem type="default" value="New course available" />);
  //   const listItem = screen.getByRole('listitem');
    
  //   expect(listItem).toBeInTheDocument();
  //   expect(listItem).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  //   expect(listItem).toHaveAttribute('data-notification-type', 'default');
  // });

  // test('renders li element with red color and data-notification-type set to urgent when type prop s "urgent"', () => {
  //   render (<NotificationItem type="urgent" value="New course available" />);
  //   const listItem = screen.getByRole('listitem');

  //   expect(listItem).toBeInTheDocument();
  //   expect(listItem).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  //   expect(listItem).toHaveAttribute('data-notification-type', 'urgent');
  // });

  test('calls markAsRead with correct id when notification item is clicked', () => {
    const markAsReadMock = jest.fn();
    const notificationId = 5;
    
    render(
      <NotificationItem 
        type="default" 
        value="Test notification" 
        id={notificationId}
        markAsRead={markAsReadMock}
      />
    );
    
    const listItem = screen.getByRole('listitem');
    fireEvent.click(listItem);
    
    expect(markAsReadMock).toHaveBeenCalledTimes(1);
    expect(markAsReadMock).toHaveBeenCalledWith(notificationId);
  }); 
  
});