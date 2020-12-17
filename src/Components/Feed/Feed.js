import React from 'react';
import './Feed.css';
import DisplayPosts from '../DisplayPosts/DisplayPosts';

const Feed = ({currentRoute, postData, createPost, handleNewMessageChange, visitingWho, isFollowing, handleFollowUpdate}) => {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     posts: this.props.postData,
  //     newMessage: ''
  //   }
  // }

  // onNewMessageChange = (e) => {
  //   this.setState({newMessage: e.target.value})
  // }

  // onPostSubmit = (e) => {
  //   e.preventDefault()
  //   const data = {
  //     username: this.props.username,
  //     message:  this.state.newMessage
  //   }

  //   fetch('http://localhost:3000/posts', {
  //   method: 'POST', // or 'PUT'
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     this.setState({posts: data})
  //     console.log('Success:');
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }

    if (currentRoute === 'home') {
      return (
        <div id="feedbackground" style={{height: "100%"}}>
          <div id="feed" >
            <div style={{display: "block", height: "7rem"}}></div>
            <div id="postsomething">
              <div className="postsomethingcontent"  >
                <img src="https://uploads.scratch.mit.edu/users/avatars/51223151.png" alt="" id="profilepicture" />
              </div>
              <form id="newmessageform">
                <input type="text" placeholder="Say Something!" className="postsomethingcontent" id="postsomethingtext" onChange={handleNewMessageChange}/>
                <button className="postsomethingcontent" id="postbutton" onClick={createPost}>Post</button>
              </form>

            </div>
            <div id="postpadding">
              {postData.map(post => <DisplayPosts
              key={'' + post.id}
              username={post.username}
              message={post.post_message}
              date={post.date_posted}/>)}
            </div>

          </div>
        </div>
      )
    }

    else if (currentRoute === 'profile') {
      return (
        <div id="feedbackground" style={{height: "100%"}}>
          <div id="feed">
            <div style={{display: "block", height: "7rem"}}></div>
            <div id="postpadding">
              {postData.map(post => <DisplayPosts
              key={'' + post.id}
              username={post.username}
              message={post.post_message}
              date={post.date_posted}/>)}
            </div>

          </div>
        </div>
      )
    }

    else if (currentRoute === 'visitingProfile') {
      return (
        <div id="feedbackground" style={{height: "100%"}}>
          <div id="feed">
            <div id="visitingheadline">
              <img src="https://uploads.scratch.mit.edu/users/avatars/51223151.png" style={{width: "6rem"}} alt=''/>
              <h2>{visitingWho}</h2>
              <button onClick={handleFollowUpdate}>
                {isFollowing === false ? <img src="https://static.thenounproject.com/png/581154-200.png" style={{width: "6rem"}} alt=''/> : <img src="https://static.thenounproject.com/png/972420-200.png" style={{width: "2.5rem"}} alt=''/>}
              </button>
            </div>
            <div style={{display: "block", height: "7rem"}}></div>
            <div id="visitedprofile">
              {postData.map(post => <DisplayPosts
              key={'' + post.id}
              username={post.username}
              message={post.post_message}
              date={post.date_posted}/>)}
            </div>

          </div>
        </div>
      )
    }

};

export default Feed;