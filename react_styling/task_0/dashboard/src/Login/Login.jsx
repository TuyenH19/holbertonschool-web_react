function Login() {
  return (
    <div className="App-body">
          <p>Login to access the full dashboard</p>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />
            </div>
          <button type="button">OK</button>
        </div>
  )
};

export default Login;
