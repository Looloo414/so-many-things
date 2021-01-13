import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import authService from "../../services/authService";
import Users from '../Users/Users'
import "./App.css";

class App extends Component {
  state = {
    user: authService.getUser(),
      AnnasThings: [
        { 
          name: 'Hot Sauce',
          image: 'https://images.unsplash.com/photo-1519420638722-a2a5749c32be?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aG90JTIwc2F1Y2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          attributes: ['boosts metabolism', 'yummy', 'goes on tacos and many things']
        },
        {
          name: 'Coffee',
          image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          attributes: ['caffeine', 'life source', 'power source', 'happiness']
        },
        {
          name: 'cats',
          image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          attributes: ['cute', 'liquid', 'funny']
        },
        {
          name: 'sleep',
          image: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fHNsZWVwfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          attributes: ["why do i even wake up", "never enough"] 
        }
      ],
  };

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push("/");
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() });
  };

  render() {
    const { user } = this.state
    return (
      <>
        <NavBar user={this.state.user} handleLogout={this.handleLogout}/>
        <Route
          exact
          path="/"
          render={() => (
            <main>
              <h1>Welcome. This is an authorization template.</h1>
            </main>
          )}
        />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={() =>
            user ? <Users /> : <Redirect to="/login" />
          }
        />
      </>
    );
  }
}

export default App;
