import React, { Component } from "react";
import axios from "axios";
import UsersList from "./usersList/UsersList";

const dataBase = `https://auth-9fba3-default-rtdb.firebaseio.com/auth.json`;

class Users extends Component {
  state = {};

  async componentDidMount() {
    this.props.setIsLoading();
    try {
      const response = await axios.get(dataBase);
      //   console.log(response.data);
      const keys = Object.keys(response.data);
      //   console.log("keys", keys);
      const modData = keys.reduce((acc, key) => {
        acc.push({ id: key, ...response.data[key] });
        return acc;
      }, []);
      this.props.setUsers([...modData]);
      //   this.setState({ users: [...modData] });
    } catch (error) {
      this.props.setError(error);
    } finally {
      this.props.setIsLoading();
    }
  }

  render() {
    return (
      <>
        {this.props.isLoading && <h2>...loading</h2>}
        <h2>Users</h2>
        <UsersList usersList={this.props.users} deleteUser={this.props.deleteUser} />
      </>
    );
  }
}

export default Users;
