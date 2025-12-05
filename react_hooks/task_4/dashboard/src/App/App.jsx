import React, { useState, useEffect, useCallback } from 'react';
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
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
  ]);
  const [courses, setCourses] = useState([
    { id: 1, name: 'ES6', credit: '60' },
    { id: 2, name: 'Webpack', credit: '20' },
    { id: 3, name: 'React', credit: '40' }
  ]);

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'h') {
        alert('Logging you out');
        logOut();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [logOut]); // Re-run when logOut changes

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
