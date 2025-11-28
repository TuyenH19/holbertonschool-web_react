import React, { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, id, markAsRead } = this.props;
    const colorClass = type === 'urgent' ? 'text-[var(--urgent-notification-item)]' : 'text-[var(--default-notification-item)]';

    if (html) {
      return (
        <li 
          data-notification-type={type}
          className={`${colorClass} flex items-start gap-2 mb-2 before:content-['■'] before:text-base max-[912px]:p-3 max-[912px]:border-b max-[912px]:border-black max-[912px]:text-xl`}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        />
      );
    }

    return (
      <li 
        data-notification-type={type}
        className={`${colorClass} flex items-start gap-2 mb-2 max-[912px]:p-3 max-[912px]:border-b max-[912px]:border-black max-[912px]:text-xl`}
        onClick={() => markAsRead(id)}
      >
        <span className="text-base max-[912px]:hidden">■</span>
        <span>{value}</span>
      </li>
    );
  }
}

export default NotificationItem;
