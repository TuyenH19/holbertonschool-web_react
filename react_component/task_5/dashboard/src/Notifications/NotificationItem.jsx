import React, { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, id, markAsRead } = this.props;
    const color = type === 'urgent' ? 'red' : 'blue';

    if (html) {
      return (
        <li 
          data-notification-type={type}
          style={{ color: color }}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        />
      );
    }

    return (
      <li 
        data-notification-type={type}
        style={{ color: color }}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
