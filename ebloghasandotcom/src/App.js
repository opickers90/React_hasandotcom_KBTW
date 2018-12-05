import React, { Component } from "react";
import fire from "./firebase/firebase";

import "./index.css";

import NavBarDefault from "./components/navigationbar/NavBarDefault";
import NavBarAfterLogin from "./components/navigationbar/NavBarAfterLogin";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
    }
  }
   componentDidMount(){
    this.authListener();
   }


   authListener(){
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        } else {
        this.setState({user: null});
      }
    });
   }

  render() {
    return (
      <div>
          {this.state.user ? (<NavBarAfterLogin/>) : (<NavBarDefault/>)}

      </div>
    );
  }
}

export default App;
