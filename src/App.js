import React from 'react';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Settings from './Components/Settings/Settings';
import FollowersPage from './Components/FollowersPage/FollowersPage';
import './App.css';

const url = `https://thawing-scrubland-24952.herokuapp.com/`;

const firstState = () => {
  return {
    route: 'signin',
    routerendered: 'signin',
    user_id: '',
    whoSignedIn: '',
    loginStatus: '',
    username: '',
    email: '',
    password: '',
    postData: [],
    newMessage: '',
    searchedUsers: [],
    visitingWho: '',
    isFollowing: false,
    followersPageData: {followers: [], following: []}
  }
}

var initialState = firstState();

class App extends React.Component {
  constructor() {
    super()

    this.state = initialState
  }

  componentDidUpdate() {
    if (this.state.route === 'home' && this.state.route !== this.state.routerendered) {
      this.initializeFeedPage();
    }
    else if (this.state.route === 'profile' && this.state.route !== this.state.routerendered) {
      this.initializeProfilePage();
    }
    else if (this.state.route === 'visitingProfile' && this.state.route !== this.state.routerendered) {
      this.initializeVisitedProfilePage()
      this.isUserFollowing()
    }
    else if (this.state.route === 'followers' && this.state.route !== this.state.routerendered) {
      this.followerPageSetup()
    }
  }


  initializeFeedPage = () => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: this.state.whoSignedIn}),
      })
      .then(response => response.json())
      .then(data => {
        this.setState({postData: data})
        this.setState({routerendered: 'home'})
        console.log('init: Success');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  initializeProfilePage = () => {
    fetch(`${url}myposts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: this.state.whoSignedIn}),
      })
    .then(response => response.json())
    .then(data => {
      this.setState({postData: data})
      this.setState({routerendered: 'profile'})
      console.log('init: Success');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  initializeVisitedProfilePage = () => {
    fetch(`${url}visitingposts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: this.state.visitingWho}),
      })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      console.log("data: ", data)
      this.setState({routerendered: 'visitingProfile'})
      this.setState({postData: data})
      console.log('init: Success');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  followerPageSetup = () => {
    fetch(`${url}getmyfollowerdata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: this.state.whoSignedIn}),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({routerendered: 'followers'})
      this.setState({followersPageData: data})
    })
  }

  isUserFollowing = () => {
    const data = {
      username: this.state.whoSignedIn,
      visitingWho: this.state.visitingWho
    }

    fetch(`${url}isfollowing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({isFollowing: data})
    })
  }

  handleFollowUpdate = () => {
    const data = {
      username: this.state.whoSignedIn,
      visitingWho: this.state.visitingWho,
    }

    fetch(`${url}followupdate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => this.setState({isFollowing: data}))
    .catch(err => console.log(err))
  }

  initializeState = () => {
    this.setState(firstState())
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  onRouteChange = (e) => {
    const {route} = this.state
    this.setState({loginStatus: ''})
    this.setState({route: e.currentTarget.value});

    if (route === 'home' || route === 'profile' || route === 'visitingProfile' || route === 'settings' || route === 'followers')
    document.getElementById('searchbar').value = ''
    this.setState({searchedUsers: []})
  }

  onVisitingRouteChange = (e) => {
    this.setState({route: 'visitingProfile'})
    this.setState({routerendered: ''})
    console.log("user visited: ", e.target.value)
    this.setState({visitingWho: e.target.value})

    document.getElementById('searchbar').value = ''
    this.setState({searchedUsers: []})
  }

  onFollowerRouteChange = (e) => {
    this.setState({route: 'visitingProfile'})
    this.setState({visitingWho: e.currentTarget.value})
    this.setState({routerendered: ''})
  }

  //Handles changing the state of who is being searched
  handleSearchBarChange = (e) => {
    this.setState({userSearchBar: e.target.value})

    if (e.target.value !== '') {
      fetch(`${url}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: this.state.whoSignedIn}),
        })
      .then(response => response.json())
      .then(data => {
        var result = data.filter(obj => obj.username.indexOf(e.target.value) > -1);
        this.setState({searchedUsers: result})
        console.log(result)
      })
      .catch(err => console.log(err))
    }
    else {
      this.setState({searchedUsers: []})
    }
  }

  //API call to signin route
  handleSignin = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    const data = {
      email: email,
      password: password
    }

    fetch(`${url}signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data === 'Wrong Credentials') {
        this.setState({loginStatus: data})
        console.log(data);
      }
      else {
        this.setState({whoSignedIn: data.username})
        this.setState({route: 'home'});
        console.log('Success');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  //API call to register route
  handleRegister = (e) => {
    e.preventDefault()
    const {username, email, password} = this.state
    const dataInfo = {
      username: username,
      email: email,
      password: password
    }

    fetch(`${url}register`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataInfo),
    })
    .then(response => response.json())
    .then(data => {
      if (data === 'Username Taken!' || data === 'Unable to Register') {
        this.setState({loginStatus: data})
        console.log(data);
      }
      else {
        this.setState({route: 'home'});
        this.setState({whoSignedIn: data.username})
        console.log('Success');
      }

    })
    .catch(error => {
      console.log('error in credentials');
    });
  }

  //Handles the message state for the posts
  handleNewMessageChange = (e) => {
    this.setState({newMessage: e.target.value})
  }

  //Handles uploading a post to the database
  createPost = (e) => {
    e.preventDefault();
    const data = {username: this.state.whoSignedIn, message: this.state.newMessage}

    fetch(`${url}post`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({routerendered: ''})
      console.log('Success');
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    document.getElementById('postsomethingtext').value = ''
  }

  render() {
    const {route, loginStatus, whoSignedIn, postData, searchedUsers, visitingWho, isFollowing, followersPageData} = this.state;
    const {handleRegister, handleUsernameChange, handleEmailChange, handlePasswordChange, onRouteChange, handleSignin, initializeState, createPost, handleNewMessageChange, handleSearchBarChange, onVisitingRouteChange, handleFollowUpdate, onFollowerRouteChange} = this;
    let page;

    if (route === 'signin') {
      page = <SignIn onRouteChange={onRouteChange} handleSignin={handleSignin} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} loginStatus={loginStatus} />
    }
    else if (route === 'register') {
      page = <Register onRouteChange={onRouteChange} handleRegister={handleRegister} handleUsernameChange={handleUsernameChange} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} loginStatus={loginStatus}/>
    }
    else if (route === 'home' || route === 'profile' || route === 'visitingProfile') {
      page = <Home username={whoSignedIn} onRouteChange={onRouteChange} currentRoute={route} postData={postData} createPost={createPost} handleNewMessageChange={handleNewMessageChange} handleSearchBarChange={handleSearchBarChange} searchedUsers={searchedUsers} onVisitingRouteChange={onVisitingRouteChange} visitingWho={visitingWho} isFollowing={isFollowing} handleFollowUpdate={handleFollowUpdate}/>
    }
    else if (route === 'settings') {
      page = <Settings username={whoSignedIn} onRouteChange={onRouteChange} initializeState={initializeState} searchedUsers={searchedUsers} handleSearchBarChange={handleSearchBarChange} onVisitingRouteChange={onVisitingRouteChange}/>
    }

    else if (route === 'followers') {
      page = <FollowersPage searchedUsers={searchedUsers} username={whoSignedIn} onRouteChange={onRouteChange} handleSearchBarChange={handleSearchBarChange} onFollowerRouteChange={onFollowerRouteChange} followersPageData={followersPageData} onVisitingRouteChange={onVisitingRouteChange}/>
    }

    return (
      <div>
        {page}
      </div>
    )
  }

}

export default App;
