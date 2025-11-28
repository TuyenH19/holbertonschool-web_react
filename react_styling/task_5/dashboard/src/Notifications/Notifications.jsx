import React, { Component } from 'react';
import closeIcon from '../assets/close-button.png';
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
    const shouldBounce = notifications.length > 0 && !displayDrawer;

    return (
      <>
        <div className={`menuItem absolute top-0 right-0 p-4 max-[912px]:hidden ${shouldBounce ? 'animate-bounce' : ''}`}>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className="Notifications border-dashed border-2 border-[var(--main-color)] w-auto min-w-96 absolute top-10 right-3 p-4 bg-white max-[912px]:fixed max-[912px]:top-0 max-[912px]:left-0 max-[912px]:right-0 max-[912px]:bottom-0 max-[912px]:w-full max-[912px]:h-full max-[912px]:border-0 max-[912px]:p-3 max-[912px]:m-0 max-[912px]:text-xl max-[912px]:z-50">
            <div className="flex justify-between items-center mb-2">
              <p className="m-0">{notifications.length === 0 ? 'No new notification for now' : 'Here is the list of notifications'}</p>
              <button
                aria-label="Close"
                onClick={() => console.log('Close button has been clicked')}
                className="border-0 bg-transparent cursor-pointer"
              >
                <img src={closeIcon} alt="close" style={{ height: 20, width: 20 }} />
              </button>
            </div>
            {notifications.length > 0 && (
              <ul className="list-none pl-0 max-[912px]:p-0 max-[912px]:m-0 max-[912px]:w-full">
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
            )}
          </div>
        )}
      </>
    );
  }
}

export default Notifications;
