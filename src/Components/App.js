import React, { Component } from "react";
import axios from "axios";
import Authentication from "./authentication/Authentication";
import Users from "./users/Users";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    isLoading: false,
    error: "",
  };

  setIsLoading = () => {
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  };

  setError = (error) => {
    this.setState({ error });
  };

  setUsers = (data) => {
    this.setState((prevState) => ({ users: [...prevState.users, ...data] }));
  };
  deleteUser = async (e) => {
    const id = e.target.id;
    this.setIsLoading();
    try {
      await axios.delete(
        `https://auth-9fba3-default-rtdb.firebaseio.com/auth/${id}.json`
      );
      this.setState((prevState) => ({
        users: [...prevState.users.filter((user) => user.id !== id)],
      }));
    } catch (error) {
      this.setError(error);
    } finally {
      this.setIsLoading();
    }
  };

  render() {
    const { isLoading, error, users } = this.state;
    return (
      <div className='App'>
        <Authentication
          setUsers={this.setUsers}
          isLoading={isLoading}
          setIsLoading={this.setIsLoading}
          error={error}
          setError={this.setError}
        />
        <Users
          users={users}
          setUsers={this.setUsers}
          isLoading={isLoading}
          setIsLoading={this.setIsLoading}
          error={error}
          setError={this.setError}
          deleteUser={this.deleteUser}
        />
      </div>
    );
  }
}
export default App;
