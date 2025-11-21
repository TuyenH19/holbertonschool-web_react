import closeIcon from '../assets/close-button.png';
import './Notifications.css';
import NotificationItem from './NotificationItem';

function Notifications({ notifications }) {
  return (
    <div className="notification-items">
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

      <button
        aria-label="Close"
        style={{ float: 'right' }}
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeIcon} alt="close" style={{ height: 20, width: 20 }} />
      </button>
    </div>
  );
}

export default Notifications;
