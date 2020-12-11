import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
const About = (props) => {
  console.log("about", props);

  return (
    <>
      <h2>About</h2>
      <button onClick={props.history.goBack}>Go home</button>
      <NavLink
        to={{
          pathname: `${props.match.url}/link1`,
          //   search: "?category=adventure",
          //   hash: "#treasure-island",
        //   state: { from: "/link1" },
        }}>
        Link1
      </NavLink>
      <NavLink
        to={{
          pathname: `${props.match.url}/link2`,
          //   search: "?category=adventure",
          //   hash: "#treasure-island",
            state: { from: "/link2" },
        }}>
        Link2
      </NavLink>

      <Switch>
        <Route path='/about/link1' render={() => <h2>Link1</h2>} />
        <Route path='/about/link2' render={() => <h2>Link2</h2>} />
      </Switch>
    </>
  );
};

export default About;
