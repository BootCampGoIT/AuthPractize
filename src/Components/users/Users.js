import React, { Component } from "react";
import axios from "axios";
import UsersList from "./usersList/UsersList";

class Users extends Component {
  state = {};

  render() {
    console.log("this.props users", this.props);
    return (
      <>
        {this.props.isLoading && <h2>...loading</h2>}
        <h2>Users</h2>
        <UsersList
          usersList={this.props.users}
          deleteUser={this.props.deleteUser}
        />
      </>
    );
  }
}

export default Users;
