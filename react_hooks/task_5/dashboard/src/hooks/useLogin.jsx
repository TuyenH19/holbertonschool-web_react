import { useState } from 'react';

export default function useLogin(initialEmail = '', initialPassword = '') {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
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

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword
  };
}
