import './App.css';
import holbertonLogo from './assets/holberton-logo.jpg';
import { getCurrentYear, getFooterCopy } from './utils.js';
import Notifications from './Notifications.jsx';

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>
      <div className="App">
        <header className="App-header">
          <img src={holbertonLogo} alt="holberton logo" />
          <h1>School dashboard</h1>
        </header>
        <div className="App-body">
          <p>Login to access the full dashboard</p>
            <label htmlFor="email">
              Email:
              <input type="email" id="email" name="email" />
            </label>
            <label htmlFor="password">
              Password:
              <input type="password" id="password" name="password" />
            </label>
          <button type="button">OK</button>
        </div>
        <div className="App-footer">
          <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
        </div>
      </div>
    </>
  );
}

export default App;
