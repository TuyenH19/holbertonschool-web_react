import React, { useState } from 'react' ;
import PropTypes from 'prop-types';

function Login({ logIn = () => {}, email: initialEmail = '', password: initialPassword = '' }) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({email : '', password : ''});

  // The event parameter represents the form submission event 
  // that's automatically passed by the browser when a form is submitted.
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    logIn(email, password);
  };

  const validateForm = (emailValue, passwordValue) => {
    // Use regex to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(emailValue);
    const isPasswordValid = passwordValue.length >= 8;
    
    return isEmailValid && isPasswordValid;
  };

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setFormData({...formData, email: newEmail})
    const isValid = validateForm(newEmail, password);
    setEnableSubmit(isValid);
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setFormData({...formData, password: newPassword});
    const isValid = validateForm(email, newPassword);
    setEnableSubmit(isValid);
  };

  return (
    <div>
      <p className="text-lg mb-5 max-[912px]:text-base">Login to access the full dashboard</p>
      <form 
        className="flex flex-wrap items-center gap-4 max-[912px]:flex-col max-[912px]:items-stretch max-[912px]:gap-3"
        onSubmit={handleLoginSubmit}
      >
        <div className="inline-flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start max-[912px]:w-full">
          <label htmlFor="email" className="font-normal max-[912px]:mb-1">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={handleChangeEmail}
            className="px-2.5 py-1 border border-gray-300 rounded text-base max-[912px]:w-full max-[912px]:py-2"
          />
        </div>
        <div className="inline-flex items-center gap-2 max-[912px]:flex-col max-[912px]:items-start max-[912px]:w-full">
          <label htmlFor="password" className="font-normal max-[912px]:mb-1">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={handleChangePassword}
            className="px-2.5 py-1 border border-gray-300 rounded text-base max-[912px]:w-full max-[912px]:py-2"
          />
        </div>
        <input 
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className="px-4 py-1 bg-white text-black border border-gray-300 rounded cursor-pointer text-base hover:bg-gray-100 max-[912px]:w-full max-[912px]:py-2 max-[912px]:mt-2"
        />
      </form>
    </div>
  );
}

Login.propTypes = {
  logIn: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string
};

export default Login;
