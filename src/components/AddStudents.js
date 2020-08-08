import React from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import qs from "qs";

import axios from "axios";
import MyToasts from "./Mytoasts";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export default class AddStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.StudentChange = this.StudentChange.bind(this);
    this.submitStudent = this.submitStudent.bind(this);
  }

  StudentChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  studentList = () => {
    return this.props.history.push("/StudentList");
  };
  initialState = {
    id: "",
    cne: "",
    name: "",
    admis: "",
    filiere: "",
  };

  resetStudent = () => {
    this.setState(() => this.initialState);
  };

  componentDidMount() {
    const studentId = +this.props.match.params.id;
    if (studentId) {
      this.findStudentById(studentId);
    }
  }

  findStudentById = (studentId) => {
    axios
      .get("http://localhost:8080/students/" + studentId)
      .then((respense) => {
        if (respense.data != null) {
          this.setState({
            id: respense.data.id,
            cne: respense.data.cne,
            name: respense.data.name,
            admis: respense.data.admis,
            filiere: respense.data.filiere.name,
          });
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  submitStudent = (event) => {
    event.preventDefault();

    const students = {
      cne: this.state.cne,
      name: this.state.name,
      admis: this.state.admis,
      filiere: this.state.filiere,
    };
    axios
      .post(
        "http://localhost:8080/students",
        {
          ...students,
          filiere: { id: students.filiere },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((respense) => {
        if (respense.data != null) {
          this.setState({
            show: true,
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        } else
          this.setState({
            show: false,
          });
      });
    this.setState(this.initialState);
  };

  updateStudent = (event) => {
    event.preventDefault();

    const students = {
      cne: this.state.cne,
      name: this.state.name,
      admis: this.state.admis,
      filiere: this.state.filiere,
    };

    axios
      .put(
        "http://localhost:8080/students/" + this.state.id,
        {
          ...students,
          filiere: { id: students.filiere },
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((respense) => {
        if (respense.data != null) {
          this.setState({
            show: true,
          });
          setTimeout(() => this.setState({ show: false }), 3000);
          setTimeout(() => this.studentList(), 3000);
        } else
          this.setState({
            show: false,
          });
      });
    this.setState(this.initialState);
  };
  render() {
    const { cne, name, admis, filiere } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToasts
            show={this.state.show}
            message={"Student Saved Successfully."}
            type={"success"}
          />
        </div>

        <Card className="border border-dark bg-dark text-white ">
          <Card.Header className="text-center">
            {" "}
            <FontAwesomeIcon
              icon={this.state.id ? faEdit : faPlusSquare}
              className="mx-2"
            />
            {this.state.id ? "Modifier un étudeiant" : "Ajouter un étudiant"}
          </Card.Header>
          <Form
            onReset={this.resetStudent}
            onSubmit={this.state.id ? this.updateStudent : this.submitStudent}
            id="studentIdForm"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCne">
                  <Form.Label> Code nationale d'étudiant </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    name="cne"
                    className="bg-dark text-white"
                    value={cne}
                    onChange={this.StudentChange}
                    type="text"
                    placeholder="EX: 13xxxxxxxx"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridNom">
                  <Form.Label>Nom Complet</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="name"
                    className="bg-dark text-white"
                    value={name}
                    onChange={this.StudentChange}
                    placeholder="EX: Ahmed Abrfoun "
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFilier">
                  <Form.Label> Filière </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    name="filiere"
                    as="select"
                    className="bg-dark text-white"
                    value={filiere}
                    onChange={this.StudentChange}
                    type="text"
                    placeholder="EX: MIP"
                  >
                    <option>choisir la Filière</option>
                    <option value={1}>BCG</option>
                    <option value={2}>MIP</option>
                    <option value={3}>GEGM</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAdmis">
                  <Form.Label> Résultat </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    name="admis"
                    value={admis}
                    className="bg-dark text-white"
                    onChange={this.StudentChange}
                    type="text"
                    placeholder="EX: admis/non admis "
                  ></Form.Control>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm mx-2" variant="success" type="submit">
                {" "}
                <FontAwesomeIcon icon={faSave} className="mx-2" />
                {this.state.id ? "Modifier" : "Ajouter"}
              </Button>
              <Button size="sm mx-2" variant="info" type="reset">
                {" "}
                <FontAwesomeIcon icon={faUndo} className="mx-2" />
                remettre
              </Button>
              <Button
                size="sm mx-2"
                variant="info"
                type="button"
                onClick={this.studentList.bind()}
              >
                {" "}
                <FontAwesomeIcon icon={faList} className="mx-2" />
                studentList
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>

      // <Container className="text-center text-white">
      //   <h1>List of Students </h1>

      // </Container>
    );
  }
}
