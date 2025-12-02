import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      },
      logOut: this.logOut,
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
      ],
      courses: [
        { id: 1, name: 'ES6', credit: '60' },
        { id: 2, name: 'Webpack', credit: '20' },
        { id: 3, name: 'React', credit: '40' }
      ]
    };
  }
  // Remove logOut props from App
  // static defaultProps = {
  //   logOut: () => {}
  // };

  logOut = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      }
    });
  };

  logIn = (email, password) => {
    this.setState({
      user: {
        email: email,
        password: password,
        isLoggedIn: true
      }
    });
  };

  markNotificationAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
    this.setState({
      notifications: this.state.notifications.filter(notification => notification.id !== id)
    });
  };

  handleDisplayDrawer = () => {
    console.log('handleDisplayDrawer called');
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    console.log('handleHideDrawer called');
    this.setState({ displayDrawer: false });
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
      this.state.logOut();
    }
  };

  render() {
    // Remove isLoggedIn props from App 
    // const { isLoggedIn = false } = this.props;

    return (
      <AppContext.Provider value={{ user: this.state.user, logOut: this.state.logOut }}>
        <div className="root-notifications">
          <Notifications 
            notifications={this.state.notifications} 
            displayDrawer={this.state.displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />
        </div>
        <div className="App h-screen max-w-full flex flex-col max-[912px]:h-auto">
          <Header />
          <div className="flex-1 flex flex-col max-[912px]:p-0">
            {/* Refactor code use state isLoggedIn
            {isLoggedIn ? ( */}
            {this.state.user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseListWithLogging courses={this.state.courses} />
              </BodySectionWithMarginBottom>
            ) : (
              <div className="mb-10 px-5 max-[912px]:px-3 max-[912px]:mb-5">
                <h2 className="text-xl font-bold pb-2.5 mb-2.5 border-b-[3px] border-[var(--main-color)]">Log in to continue</h2> 
                <LoginWithLogging logIn={this.logIn} />
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
}

export default App;
