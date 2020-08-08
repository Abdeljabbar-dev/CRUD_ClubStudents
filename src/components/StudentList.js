import React from "react";
import { Table, Container, Card, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToasts from "./Mytoasts";
import { Link } from "react-router-dom";

export default class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  deleteStudent(studentId) {
    axios
      .delete("http://localhost:8080/students/" + studentId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            show: true,
          });
          setTimeout(() => this.setState({ show: false }), 3000);

          this.setState({
            students: this.state.students.filter((i) => i.id !== studentId),
          });
        } else
          this.setState({
            show: false,
          });
      });
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/students")
      .then((respense) => respense.data)
      .then((data) => {
        this.setState({ students: data });
      });
  }

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToasts
            show={this.state.show}
            message={"Student deleted Successfully."}
            type={"danger"}
          />
        </div>
        <Card className="border border-dark bg-dark text-white text-center">
          <Card.Header>
            <FontAwesomeIcon icon={faList} className="mx-2" />
            Liste des étudiants
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>CNE</th>
                  <th>Nom complet</th>
                  <th>Filière</th>
                  <th>Résultat</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.students.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">y a pas d'étudiant enregistré.</td>
                  </tr>
                ) : (
                  this.state.students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.cne}</td>
                      <td style={{ textTransform: "uppercase" }}>
                        {student.name}
                      </td>
                      <td>{student.filiere.name}</td>
                      <td>{student.admis}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"EditStudent/" + student.id}
                            size="sm mx-2"
                            className="btn btn-sm btn-outline-primary"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faEdit} />{" "}
                          </Link>
                          <Button
                            size="sm mx-2"
                            variant="outline-danger"
                            onClick={this.deleteStudent.bind(this, student.id)}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTrash} />{" "}
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
