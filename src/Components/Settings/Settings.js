import React from 'react';
import Nav from '../Navigation/Nav';
import './Settings.css';

const Settings = ({username, onRouteChange, initializeState, searchedUsers, handleSearchBarChange, onVisitingRouteChange}) => {
  return (
    <div >
      <Nav username={username} onRouteChange={onRouteChange} searchedUsers={searchedUsers} handleSearchBarChange={handleSearchBarChange} onVisitingRouteChange={onVisitingRouteChange}/>
      <div style={{display: "block", height: "8rem"}}></div>
      <div id="homewrapper">
        <div className="settingspage">
          <button onClick={initializeState} id="signoutbutton">
            <h2>Sign Out</h2>
          </button>
        </div>
      </div>
    </div>
  )
};

export default Settings;