import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { getCurrentYear, getFooterCopy, getLatestNotification } from '../utils/utils';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import AppContext from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false
  });
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false
    });
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({
      email: email,
      password: password,
      isLoggedIn: true
    });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    console.log('handleDisplayDrawer called');
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    console.log('handleHideDrawer called');
    setDisplayDrawer(false);
  }, []);

  // Fetch notifications when component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        const notificationsData = response.data.map(notification => {
          // Handle special case for latest notification
          if (notification.html === '__LATEST_NOTIFICATION__') {
            return {
              ...notification,
              html: { __html: getLatestNotification() }
            };
          }
          return notification;
        });
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch courses when user state changes
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses.json');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <AppContext.Provider value={{ user: user, logOut: logOut }}>
      <div className="root-notifications">
        <Notifications 
          notifications={notifications} 
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
      </div>
      <div className="App h-screen max-w-full flex flex-col max-[912px]:h-auto">
        <Header />
        <div className="flex-1 flex flex-col max-[912px]:p-0">
          {/* Refactor code use state isLoggedIn
          {isLoggedIn ? ( */}
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <div className="mb-10 px-5 max-[912px]:px-3 max-[912px]:mb-5">
              <h2 className="text-xl font-bold pb-2.5 mb-2.5 border-b-[3px] border-[var(--main-color)]">Log in to continue</h2> 
              <LoginWithLogging logIn={logIn} />
            </div>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
