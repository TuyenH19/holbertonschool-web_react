import React, { Component } from 'react';
import './App.css';
import { getCurrentYear, getFooterCopy, getLatestNotification } from '../utils/utils';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

class App extends Component {
  static defaultProps = {
    logOut: () => {}
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  };

  render() {
    const { isLoggedIn = false } = this.props;

    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ];

    const coursesList = [
      { id: 1, name: 'ES6', credit: '60' },
      { id: 2, name: 'Webpack', credit: '20' },
      { id: 3, name: 'React', credit: '40' }
    ];

    return (
      <>
        <div className="root-notifications">
          <Notifications notifications={notificationsList} displayDrawer={true} />
        </div>
        <div className="App">
          <Header />
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySection title="Log in to continue">
              <LoginWithLogging />
            </BodySection>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
