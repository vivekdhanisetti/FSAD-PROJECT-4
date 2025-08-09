import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    confirmPassword: '',
    role: '0'
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (isSignUp) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (formData.role === '0') newErrors.role = 'Please select a role';
    } else {
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add your signin logic here
      console.log('Sign in with:', formData.username, formData.password);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add your signup logic here
      console.log('Sign up with:', formData);
    }
  };

  const showSignin = () => {
    setIsLoginVisible(true);
    setIsSignUp(false);
    setErrors({});
    setFormData({
      username: '',
      password: '',
      fullName: '',
      email: '',
      confirmPassword: '',
      role: '0'
    });
  };

  const showSignup = () => {
    setIsLoginVisible(true);
    setIsSignUp(true);
    setErrors({});
    setFormData({
      username: '',
      password: '',
      fullName: '',
      email: '',
      confirmPassword: '',
      role: '0'
    });
  };

  const closeSignin = (event) => {
    if (event.target.id === 'PopUp' || event.target.className === 'close-btn') {
      setIsLoginVisible(false);
      setErrors({});
      setFormData({
        username: '',
        password: '',
        fullName: '',
        email: '',
        confirmPassword: '',
        role: '0'
      });
    }
  };

  const renderError = (field) => {
    return errors[field] ? (
      <div className="error-message">{errors[field]}</div>
    ) : null;
  };

  return (
    <>
      <button className={`btn ${isLoginVisible ? 'active' : ''}`} onClick={showSignin}>Login</button>

      {isLoginVisible && (
        <div id="PopUp" onClick={closeSignin}>
          <div id="PopUpWindow" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeSignin}>×</button>
            <div id="PopUpHeader">{isSignUp ? 'SIGNUP' : 'LOGIN'}</div>
            
            {!isSignUp ? (
              <div id="SignIn">
                <div className="Input-Box">
                  <input 
                    type="text" 
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label htmlFor="username">Username</label>
                  {renderError('username')}
                </div>
                <div className="Input-Box">
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label htmlFor="password">Password</label>
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "👁️" : "👁"}
                  </button>
                  {renderError('password')}
                </div>
                <div className="Remember-Forgot">
                  <label><input type="checkbox" /> Remember me</label>
                  <a href="#">Forgot password?</a>
                </div>
                <button id="SigninButton" onClick={handleSignIn}>Sign In</button>
                <div className="Register-Link">
                  <p>Don't have an account? <span id="Register" onClick={showSignup}>Register</span></p>
                </div>
              </div>
            ) : (
              <div id="SignUp">
                <div className="Input-Box1">
                  <input 
                    id="fullName" 
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label htmlFor="fullName">Full Name</label>
                  {renderError('fullName')}
                </div>
                <div className="Input-Box1">
                  <input 
                    id="email" 
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label htmlFor="email">Email Address</label>
                  {renderError('email')}
                </div>
                <div className="Input-Box1">
                  <input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label htmlFor="password">Password</label>
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "👁️" : "👁"}
                  </button>
                  {renderError('password')}
                </div>
                <div className="Input-Box1">
                  <input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? "👁️" : "👁"}
                  </button>
                  {renderError('confirmPassword')}
                </div>
                <div className="Input-Box1">
                  <select 
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="0">Select Role</option>
                    <option value="1">Admin</option>
                    <option value="2">Employer</option>
                    <option value="3">Seeker</option>
                  </select>
                  {renderError('role')}
                </div>
                <button id="SignupButton" onClick={handleSignUp}>Register</button>
                <div className="Signin-Back">
                  <p>Already have an account? <span id="login" onClick={showSignin}>Log In</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;