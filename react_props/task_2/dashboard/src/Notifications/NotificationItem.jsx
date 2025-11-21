function NotificationItem({ type, html, value }) {
  const color = type === 'urgent' ? 'red' : 'blue';

  return (
    <li 
      data-notification-type={type}
      style={{ color: color }}
      dangerouslySetInnerHTML={html ? html : undefined}
    >
      {!html && value}
    </li>
  );
}

export default NotificationItem;
