import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img
            width="50px"
            height="50px"
            src="https://images-na.ssl-images-amazon.com/images/I/41kMkhhTtiL.png"
            alt=""
          />
          <span> Club Etudiant </span>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Link to={"/"} className="nav-link">
            Accueil
          </Link>
          <Link to={"/StudentList"} className="nav-link">
            Les étudiants
          </Link>
          <Link to={"/AddStudents"} className="nav-link">
            Ajouter les étudiants
          </Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;
