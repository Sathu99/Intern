import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faBullhorn,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
  Alert,
} from "@themesberg/react-bootstrap";

import BgImage from "./assets/signin.svg";
import { Link, Redirect } from "react-router-dom";
import { notify } from "./Notification";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      showPassword: false,
      errorOpen: false,
      errorText: "",
      alertColor: "danger",
      EmailID: "",
      password: "",
      style_mail: {},
      text_mail: "",
      style_pass: {},
      text_pass: "",
    };
  }

  componentDidMount() {
    console.log("login page");
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  togglePasswordVisibility = (e) => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  login = () => {
    this.setState({
      isLoading: true,
    });

    const user = {
      email: this.state.EmailID,
      password: this.state.password,
    };
  };

  clearfun = (e) => {
    const name = e.target.name;

    if (name === "EmailID") {
      this.setState({
        style_mail: { visibility: "hidden" },
        text_mail: "",
      });
    }
    if (name === "password") {
      this.setState({
        style_pass: { visibility: "hidden" },
        text_pass: "",
      });
    }
  };

  validLogin = () => {
    if (this.state.EmailID === "") {
      this.setState({
        style_mail: { visibility: "visible" },
        text_mail: "Please Enter the Email ID",
      });

      return false;
    }
    if (!this.validEmail(this.state.EmailID)) {
      this.setState({
        style_mail: { visibility: "visible" },
        text_mail: "Please Enter the valid Email ID",
      });
      return false;
    }
    if (this.state.password === "") {
      this.setState({
        style_pass: { visibility: "visible" },
        text_pass: "Please Enter the Password",
      });

      return false;
    }
    if (!this.validPass(this.state.password)) {
      this.setState({
        style_pass: { visibility: "visible" },
        text_pass: "Please Enter the Regular type Password",
      });

      return false;
    } else {
      return true;
    }
  };

  validEmail = (email) => {
    const reg = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return reg.test(String(email).toLowerCase());
  };

  validPass = (password) => {
    const regx = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,14})"
    );
    return regx.test(password);
  };

  contactSubmit = (e) => {
    e.preventDefault();
    if (this.validLogin()) {
      this.login();
      this.setState({
        errorOpen: false,
      });
    } else {
      this.setState({
        errorOpen: true,
        errorText: "Your Form is not Valid Check again.",
        alertColor: "danger",
      });
    }
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/home" },
    };
    if (this.props.authenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <main>
          <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
            <Container>
              <p className="text-center">
                <Card.Link as={Link} to="/" className="text-gray-700">
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back
                  to homepage
                </Card.Link>
              </p>
              <Row
                className="justify-content-center form-bg-image"
                style={{ backgroundImage: `url(${BgImage})` }}
              >
                <Col
                  xs={12}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                      <h3 className="mb-0">Login in to Your Account</h3>
                    </div>
                    <Form
                      className="mt-4"
                      id="LoginForm"
                      onSubmit={this.contactSubmit}
                    >
                      <Form.Group id="email" className="mb-4">
                        <span
                          className="errorr"
                          id="EmailIDerr"
                          style={this.state.style_mail}
                        >
                          {this.state.text_mail}
                        </span>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="EmailID"
                            id="EmailID"
                            placeholder="Email ID"
                            onChange={this.handleInputChange}
                            onInput={this.clearfun}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Group id="password" className="mb-4">
                          <span
                            className="errorr"
                            id="Passworderr"
                            style={this.state.style_pass}
                          >
                            {this.state.text_pass}
                          </span>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              type={
                                this.state.showPassword ? "text" : "password"
                              }
                              name="password"
                              id="password"
                              placeholder="Password"
                              onChange={this.handleInputChange}
                              onInput={this.clearfun}
                            />
                            <InputGroup.Text>
                              <FontAwesomeIcon
                                onClick={this.togglePasswordVisibility}
                                color={this.state.showPassword ? "#262B40" : ""}
                                icon={faEye}
                              />
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="w-100">
                        Log In
                      </Button>
                      <br />
                      <br />
                      <Alert
                        variant={this.state.alertColor}
                        show={this.state.errorOpen}
                      >
                        <div className="d-flex justify-content-between">
                          <div>
                            <FontAwesomeIcon
                              icon={faBullhorn}
                              className="me-1"
                            />
                            <strong>{this.state.errorText}</strong>
                          </div>
                        </div>
                      </Alert>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </div>
    );
  }
}

export default Login;
