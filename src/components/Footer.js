import React from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
class StudentList extends React.Component {
  render() {
    let fullYear = new Date().getFullYear();
    return (
      <Navbar className="bg-dark text-white " fixed="bottom" variant="dark">
        <Container>
          <Col lg={12}>
            <p className="text-center">
              {fullYear}-{fullYear + 1} All Rights is Reserved by Abdeljabbar
              JADDI{" "}
            </p>
          </Col>
        </Container>
      </Navbar>
    );
  }
}
export default StudentList;
