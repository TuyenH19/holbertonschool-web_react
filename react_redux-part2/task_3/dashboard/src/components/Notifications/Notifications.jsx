import { memo, useState, useRef } from "react";
import { StyleSheet, css } from "aphrodite";
import { useSelector, useDispatch } from "react-redux";
import closeIcon from "../../assets/close-icon.png";
import NotificationItem from "../NotificationItem/NotificationItem";
import { markNotificationAsRead } from "../../features/notifications/notificationsSlice";
import { getFilteredNotifications } from "../../features/selectors/notificationSelector";

const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },
  to: {
    opacity: 1,
  },
};

const bounceKeyframes = {
  "0%": {
    transform: "translateY(0px)",
  },
  "50%": {
    transform: "translateY(-5px)",
  },
  "100%": {
    transform: "translateY(5px)",
  },
};

const styles = StyleSheet.create({
  notificationItems: {
    position: "relative",
    border: "3px dotted #e1003c",
    padding: "5px",
    fontFamily: "Roboto, sans-serif",
    width: "25%",
    float: "right",
    marginTop: "20px",
    opacity: 0,
    visibility: "hidden",
    "@media (max-width: 900px)": {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "none",
      padding: 0,
      margin: 0,
      fontSize: "20px",
      backgroundColor: "white",
      zIndex: 1000,
    },
  },
  visible: {
    opacity: 1,
    visibility: "visible",
  },
  ul: {
    "@media (max-width: 900px)": {
      padding: 0,
    },
  },
  p: {
    margin: 0,
    "@media (max-width: 900px)": {
      fontSize: "20px",
    },
  },
  button: {
    position: "absolute",
    cursor: "pointer",
    right: "calc(0% - 480px)",
    top: "calc(0% - 480px)",
    background: "transparent",
    transform: "scale(0.012)",
    WebkitTransform: "scale(0.012)",
    MozTransform: "scale(0.012)",
    msTransform: "scale(0.012)",
    OTransform: "scale(0.012)",
  },
  menuItem: {
    float: "right",
    position: "absolute",
    right: "10px",
    top: "-5px",
    backgroundColor: "#fff8f8",
    cursor: "pointer",
    ":hover": {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: "1s, 0.5s",
      animationIterationCount: "3, 3",
    },
  },
  filterButtons: {
    marginBottom: "10px",
    display: "flex",
    gap: "10px",
  },
  filterButton: {
    padding: "5px 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#f0f0f0",
    },
  },
});

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const drawerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('all');
  const loading = useSelector((state) => state.notifications.loading);
  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter)
  );

  const handleToggleDrawer = () => {
    setIsVisible(!isVisible);
  };

  const handleSetFilterUrgent = () => {
    setCurrentFilter('urgent');
  };

  const handleSetFilterDefault = () => {
    setCurrentFilter('default');
  };

  const handleMarkNotificationAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  return (
    <>
      <div
        className={css(styles.menuItem)}
        onClick={handleToggleDrawer}
      >
        Your notifications
      </div>
      <div className={css(styles.notificationItems, isVisible && styles.visible)} ref={drawerRef}>
        {loading ? (
          <p className={css(styles.p)}>Loading...</p>
        ) : filteredNotifications.length > 0 ? (
          <>
            <p className={css(styles.p)}>Here is the list of notifications</p>
            <div className={css(styles.filterButtons)}>
              <button
                onClick={handleSetFilterUrgent}
                className={css(styles.filterButton)}
                aria-label="Filter urgent notifications"
              >
                ‼️ Urgent
              </button>
              <button
                onClick={handleSetFilterDefault}
                className={css(styles.filterButton)}
                aria-label="Filter default notifications"
              >
                ?? Default
              </button>
            </div>
            <button
              onClick={handleToggleDrawer}
              aria-label="Close"
              className={css(styles.button)}
            >
              <img src={closeIcon} alt="close icon" />
            </button>
            <ul className={css(styles.ul)}>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  id={notification.id}
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  markAsRead={handleMarkNotificationAsRead}
                />
              ))}
            </ul>
          </>
        ) : (
          <p className={css(styles.p)}>No new notifications for now</p>
        )}
      </div>
    </>
  );
});

export default Notifications;
