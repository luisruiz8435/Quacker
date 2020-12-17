import React from 'react';
import Nav from '../Navigation/Nav';
import Feed from '../Feed/Feed';
import './Home.css';


const Home = ({username, onRouteChange, currentRoute, postData, createPost, handleNewMessageChange, handleSearchBarChange, searchedUsers, onVisitingRouteChange, visitingWho, isFollowing, handleFollowUpdate}) => {

    return (
      <div id="homeheight">
        <Nav username={username} onRouteChange={onRouteChange} handleSearchBarChange={handleSearchBarChange} searchedUsers={searchedUsers} onVisitingRouteChange={onVisitingRouteChange}/>
        <div id="homewrapper">
          <div className="homepage">info</div>
          <Feed username={username} currentRoute={currentRoute} postData={postData} createPost={createPost} handleNewMessageChange={handleNewMessageChange} visitingWho={visitingWho} isFollowing={isFollowing} handleFollowUpdate={handleFollowUpdate}/>
          <div className="homepage">info</div>
        </div>
      </div>
    )
};

export default Home;