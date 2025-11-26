import React, { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import './Notifications.css';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications, displayDrawer } = this.props;

    return (
      <>
        <div className="menuItem">
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className="Notifications">
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
            <button
              aria-label="Close"
              style={{ float: 'right' }}
              onClick={() => console.log('Close button has been clicked')}
            >
              <img src={closeIcon} alt="close" style={{ height: 20, width: 20 }} />
            </button>
          </div>
        )}
      </>
    );
  }
}

export default Notifications;
