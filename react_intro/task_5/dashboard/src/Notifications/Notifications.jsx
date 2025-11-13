import closeIcon from './assets/close-button.png';
import { getLatestNotification } from '../utils/utils.js';
import './Notifications.css';

function Notifications() {
  return (
    <div className="notification-items">
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
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
