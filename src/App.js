import React from "react";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import StudentList from "./components/StudentList";
import AddStudents from "./components/AddStudents";

import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

function App() {
  const marginTop = {
    marginTop: "20px",
  };
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/StudentList" exact component={StudentList} />
              <Route path="/EditStudent/:id" exact component={AddStudents} />
              <Route path="/AddStudents" exact component={AddStudents} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
