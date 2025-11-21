import closeIcon from '../assets/close-button.png';
import './Notifications.css';
import NotificationItem from './NotificationItem';

function Notifications({ notifications = [], displayDrawer = false }) {
  return (
    <div className="Notifications">
      <div className="notification-title">
        <p>Your notifications</p>
      </div>
      {displayDrawer && (
        <div className="notification-items">
          {notifications.length === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>
              <ul>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
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
    </div>
  );
}

export default Notifications;
