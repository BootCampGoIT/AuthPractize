import React, { Component } from "react";

const initialState = { email: "", password: "" };

class AuthForm extends Component {
  state = {
    ...initialState,
  };

  onHandleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.signUpUser({ ...this.state });
    this.setState({ ...initialState });
  };

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.onHandleSubmit}>
        <label>
          Email:
          <input
            type='text'
            value={email}
            name='email'
            onChange={this.onHandleChange}
          />
        </label>
        <label>
          Password:
          <input
            type='text'
            name='password'
            value={password}
            onChange={this.onHandleChange}
          />
        </label>
        <button type='submit'>Sign up</button>
      </form>
    );
  }
}

export default AuthForm;
