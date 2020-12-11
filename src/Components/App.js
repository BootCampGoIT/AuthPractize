import React, { Component } from "react";
import axios from "axios";
import Authentication from "./authentication/Authentication";
import Users from "./users/Users";
import { Switch, Route, Link, NavLink, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navigation from "./navigation/Navigation";
const dataBase = `https://auth-9fba3-default-rtdb.firebaseio.com/auth.json`;

class App extends Component {
  state = {
    users: [],
    isLoading: false,
    error: "",
  };

  async componentDidMount() {
    this.setIsLoading();
    try {
      const response = await axios.get(dataBase);
      //   console.log(response.data);
      const keys = Object.keys(response.data);
      //   console.log("keys", keys);
      const modData = keys.reduce((acc, key) => {
        acc.push({ id: key, ...response.data[key] });
        return acc;
      }, []);
      this.setUsers([...modData]);
      //   this.setState({ users: [...modData] });
    } catch (error) {
      this.setError(error);
    } finally {
      this.setIsLoading();
    }
  }

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
    console.log("this.props", this.props);
    const { isLoading, error, users } = this.state;
    return (
      <div className='App'>
        {/* <Navigation /> */}
        <header>
          <nav>
            <NavLink
              to={{
                pathname: `/`,
                state: { from: this.props.location.pathname },
              }}
              exact
              className='link'
              activeClassName='activeLink'>
              Home
            </NavLink>
            <NavLink
              to={{
                pathname: `/about`,
                state: { from: this.props.location.pathname },
              }}
              className='link'
              activeClassName='activeLink'
              style={{ marginLeft: "10px" }}>
              About
            </NavLink>
            <NavLink
              to='/contacts'
              className='link'
              activeClassName='activeLink'
              style={{ marginLeft: "10px" }}>
              Contacts
            </NavLink>
            <NavLink
              to='/auth'
              className='link'
              activeClassName='activeLink'
              style={{ marginLeft: "10px" }}>
              Authentication
            </NavLink>
            <NavLink
              to={{
                pathname: `/users`,
                state: { from: this.props.location.pathname },
              }}
              className='link'
              activeClassName='activeLink'
              style={{ marginLeft: "10px" }}>
              Users
            </NavLink>
          </nav>
        </header>

        <main>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contacts' render={() => <h2>Contacts</h2>} />
            <Route
              path='/auth'
              render={() => (
                <Authentication
                  setUsers={this.setUsers}
                  isLoading={isLoading}
                  setIsLoading={this.setIsLoading}
                  error={error}
                  setError={this.setError}
                />
              )}
            />
            <Route
              path='/users'
              render={() => (
                <Users
                  users={users}
                  setUsers={this.setUsers}
                  isLoading={isLoading}
                  setIsLoading={this.setIsLoading}
                  error={error}
                  setError={this.setError}
                  deleteUser={this.deleteUser}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}
export default withRouter(App);
