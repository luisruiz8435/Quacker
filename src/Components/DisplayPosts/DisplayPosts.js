import React from 'react';
import './DisplayPosts.css';

const DisplayPosts = ({username, message, date}) => {
  return (
    <div id="singlepost">
      <h3 id="postuser">{username}</h3>
      <div className="messagebody">
        <span id="postmessage">{message}</span>
        <h3 id="posttime">{date}</h3>
      </div>
    </div>
  )
};

export default DisplayPosts;