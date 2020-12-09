import React, { Component } from "react";
import axios from "axios";
import AuthForm from "../forms/auth/AuthForm";

const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxbickfi6Veyzqqlv9ZaQgr4srCiG2b48`;

const dataBase = `https://auth-9fba3-default-rtdb.firebaseio.com/auth.json`;

class Authentication extends Component {
  state = {};

  signUpUser = async (userData) => {
    this.props.setIsLoading();
    try {
      const response = await axios.post(signUpURL, userData);
      const userInfo = await axios.post(dataBase, {
        email: response.data.email,
        localId: response.data.localId,
      });
      this.props.setUsers([
        {
          id: userInfo.data.name,
          email: response.data.email,
          localId: response.data.localId,
        },
      ]);
    } catch (error) {
      this.props.setError(error);
    } finally {
      this.props.setIsLoading();
    }
  };

  render() {
    return (
      <>
        {this.props.isLoading && <h2>...loading</h2>}
        <AuthForm signUpUser={this.signUpUser} />
      </>
    );
  }
}

export default Authentication;
