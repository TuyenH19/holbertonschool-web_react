import './App.css';
import { getCurrentYear, getFooterCopy, getLatestNotification } from '../utils/utils';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';

function App() {
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
  ];
  return (
    <>
      <div className="root-notifications">
        <Notifications notifications={notificationsList} />
      </div>
      <div className="App">
        <Header />
        <Login />
        <Footer />
      </div>
    </>
  );
}

export default App;
