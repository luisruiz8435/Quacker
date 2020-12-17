import React from 'react';
import './SignIn.css';

const SignIn = ({onRouteChange, handleSignin, handleEmailChange, handlePasswordChange, loginStatus}) => {

  if (loginStatus === 'Wrong Credentials') {
    return (
      <div id="signin">
        <form id="signinform">
          <h1>Login</h1>
          <input type="email" placeholder="Email" className="signininput" onChange={handleEmailChange}/>
          <input type="password" placeholder="Password" className="signininput" onChange={handlePasswordChange}/>
          <span id="loginstatus">{loginStatus}</span>
          <button className="signinbutton" value="home" onClick={handleSignin}>Sign In</button>
        </form>
        <button className="signinbutton" value="register" onClick={onRouteChange}>Register</button>
      </div>
    )
  }
  else {
    return (
      <div id="signin">
        <form id="signinform">
          <h1>Login</h1>
          <input type="email" placeholder="Email" className="signininput" onChange={handleEmailChange}/>
          <input type="password" placeholder="Password" className="signininput" onChange={handlePasswordChange}/>
          <button className="signinbutton" value="home" onClick={handleSignin}>Sign In</button>
        </form>
        <button className="signinbutton" value="register" onClick={onRouteChange}>Register</button>
      </div>
    )
  }

};

export default SignIn;