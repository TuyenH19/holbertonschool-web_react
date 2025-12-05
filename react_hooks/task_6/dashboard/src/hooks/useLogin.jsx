import { useState } from 'react';

export default function useLogin(logIn) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

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
    const isValid = validateForm(newEmail, password);
    setEnableSubmit(isValid);
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const isValid = validateForm(email, newPassword);
    setEnableSubmit(isValid);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (logIn) {
      logIn(email, password);
    }
  };

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}
