import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  static propTypes = {
    logIn: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string
  };

  static defaultProps = {
    logIn: () => {},
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      // Initializes email and password from props if provided
      email: props.email || '',
      password: props.password || '',
      enableSubmit: false
    };
  }
  // The event parameter represents the form submission event 
  // that's automatically passed by the browser when a form is submitted.
  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.props.logIn(this.state.email, this.state.password);
  };

  validateForm = (email, password) => {
    // Use regex to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;
    
    return isEmailValid && isPasswordValid;
  };

  handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    this.setState({ email: newEmail }, () => {
      const isValid = this.validateForm(this.state.email, this.state.password);
      this.setState({ enableSubmit: isValid });
    });
  };

  handleChangePassword = (event) => {
    const newPassword = event.target.value;
    this.setState({ password: newPassword }, () => {
      const isValid = this.validateForm(this.state.email, this.state.password);
      this.setState({ enableSubmit: isValid });
    });
  };

  render() {
    return (
      <div>
        <p className="text-lg mb-5 max-[912px]:text-base">Login to access the full dashboard</p>
        <form 
          className="flex flex-wrap items-center gap-4 max-[912px]:flex-col max-[912px]:items-stretch max-[912px]:gap-3"
          onSubmit={this.handleLoginSubmit}
        >
          <div className="inline-flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start max-[912px]:w-full">
            <label htmlFor="email" className="font-normal max-[912px]:mb-1">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={this.state.email}
              onChange={this.handleChangeEmail}
              className="px-2.5 py-1 border border-gray-300 rounded text-base max-[912px]:w-full max-[912px]:py-2"
            />
          </div>
          <div className="inline-flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start max-[912px]:w-full">
            <label htmlFor="password" className="font-normal max-[912px]:mb-1">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={this.state.password}
              onChange={this.handleChangePassword}
              className="px-2.5 py-1 border border-gray-300 rounded text-base max-[912px]:w-full max-[912px]:py-2"
            />
          </div>
          <input 
            type="submit"
            value="OK"
            disabled={!this.state.enableSubmit}
            className="px-4 py-1 bg-white text-black border border-gray-300 rounded cursor-pointer text-base hover:bg-gray-100 max-[912px]:w-full max-[912px]:py-2 max-[912px]:mt-2"
          />
        </form>
      </div>
    );
  }
}

export default Login;
