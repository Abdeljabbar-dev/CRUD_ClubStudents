import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
class Welcome extends React.Component {
  render() {
    return (
      <Jumbotron className="bg-dark text-white text-center">
        <h1>Students Plateforme</h1>
        <p>Welecom to our students plateforme, all you need is here</p>
      </Jumbotron>
    );
  }
}

export default Welcome;
