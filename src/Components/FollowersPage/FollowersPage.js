import React from 'react';
import Nav from '../Navigation/Nav';
import './FollowersPage.css';

const FollowersPage = ({searchedUsers, username, onRouteChange, onVisitingRouteChange, handleSearchBarChange, followersPageData, onFollowerRouteChange}) => {
  return (
    <div id="followerspage">
      <Nav searchedUsers={searchedUsers} username={username} onRouteChange={onRouteChange} handleSearchBarChange={handleSearchBarChange} onVisitingRouteChange={onVisitingRouteChange}/>
      <div id="testwrapper">
        <div id="followerscontainer">
          <div>
            <h1 className="block">Following</h1>
            {followersPageData.following.map(user => <button value={user.username} onClick={onFollowerRouteChange} className="followpagedata" key={"following" + user.username}><span >{user.username}</span></button>)}
          </div>
          <div>
            <h1 className="block">Followers</h1>
            {followersPageData.followers.map(user => <button value={user.username} onClick={onFollowerRouteChange} className="followpagedata" key={"follower" + user.username}><span >{user.username}</span></button>)}
          </div>
        </div>
      </div>
    </div>
  )
};

export default FollowersPage;