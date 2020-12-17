import React from 'react';
import './Nav.css';

const Nav = ({username, onRouteChange, handleSearchBarChange, searchedUsers, onVisitingRouteChange}) => {
  return (
    <div id="navigation">
      <button id="homebutton" className="navbutton" value="home" onClick={onRouteChange}>
        <img src="https://www.flaticon.com/svg/static/icons/svg/25/25694.svg" style={{width: "50%"}} alt=""/>
      </button>
      <button id="friendsbutton" className="navbutton" value="followers" onClick={onRouteChange}>
        <img src="https://img.pngio.com/friends-icons-download-3480-free-png-an-206239-png-images-pngio-friends-icon-png-512_512.png" style={{width: "50%"}} alt=""/>
      </button>
      <div id="searchbarcontainer">
        <input type="text" placeholder="search" id="searchbar" onChange={handleSearchBarChange}/>
      </div>
      <div id="searchedusers" >
        {searchedUsers.map(user => <button key={user.username} id="thesearcheduser" value={user.username} onClick={onVisitingRouteChange}>{user.username}</button>)}
      </div>
      <button id="newsbutton" className="navbutton">
        <img src="https://cdn2.iconfinder.com/data/icons/picol-vector/32/news-512.png" style={{width: "50%"}} alt=""/>
      </button>
      <button id="profilebutton" className="navbutton" value="profile" onClick={onRouteChange}>
        <div>
          <span style={{display: "block"}}>{`Hey ${username}!`}</span>
          <img src="https://uploads.scratch.mit.edu/users/avatars/51223151.png" alt="" id="profilepicture"/>
        </div>
      </button>
      <button id="settings" className="navbutton" value="settings" onClick={onRouteChange}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" style={{width: "50%"}} alt=""/>
      </button>
    </div>
  )
};

export default Nav;