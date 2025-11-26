import React, { Component } from 'react';

class NotificationItem extends Component {
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
