import React from 'react';
import './Register.css';

const Register = ({onRouteChange, handleUsernameChange, handleEmailChange, handlePasswordChange, handleRegister, loginStatus}) => {

  if (loginStatus === 'Username Taken!' || loginStatus === 'Unable to Register') {
    return (
      <div id="register">
        <form>
          <h1>Register</h1>
          <input type="text" placeholder="Username" className="registerinput" onChange={handleUsernameChange}/>
          <input type="email" placeholder="Email" className="registerinput" onChange={handleEmailChange}/>
          <input type="password" placeholder="Password" className="registerinput" onChange={handlePasswordChange}/>
          <span id="loginstatus">{loginStatus}</span>
          <button className="registerbutton" value="home" onClick={handleRegister}>Register</button>
        </form>
        <button className="registerbutton" value="signin" onClick={onRouteChange}>Sign In</button>
      </div>
    )
  }

  else {
    return (
      <div id="register">
        <form>
          <h1>Register</h1>
          <input type="text" placeholder="Username" className="registerinput" onChange={handleUsernameChange}/>
          <input type="email" placeholder="Email" className="registerinput" onChange={handleEmailChange}/>
          <input type="password" placeholder="Password" className="registerinput" onChange={handlePasswordChange}/>
          <span id="loginstatus">{loginStatus}</span>
          <button className="registerbutton" value="home" onClick={handleRegister}>Register</button>
        </form>
        <button className="registerbutton" value="signin" onClick={onRouteChange}>Sign In</button>
      </div>
    )
  }


};

export default Register;