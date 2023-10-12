import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { login as apiLogin } from "../../api";
import Dashboard from "../AdminDashboard";
import { login } from "../../features/authSlice";
import ".././style.global.css";
import "./login.css";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const loginSuccess = useSelector((state) => state.loginSuccess);

    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await apiLogin(formState.email, formState.password);
            if (response.status === 200) {
                dispatch(login(response.data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-header">
                <h1>Library Management System</h1>
            </div>
            <div className="login-header_mobile">
                <h1>LMS</h1>
            </div>
            <div className="login">
                {loginSuccess && <Dashboard />}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formState.email}
                            onChange={(event) =>
                                setFormState({ ...formState, email: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            autoComplete="on"
                            value={formState.password}
                            onChange={(event) =>
                                setFormState({ ...formState, password: event.target.value })
                            }
                        />
                    </Form.Group>
                    <div className="d-grid gap-2 mt-5">
                        <Button variant="primary" type="submit">
                            Log in
                        </Button>
                    </div>

                    <div className="mt-2">
                        <Container>
                            <Row className="mt-2">
                                <Col>
                                    <Link to="/signup">Signup</Link>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <span className="">Forgot Password?</span>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Form>
            </div>
        </div>

    );
}

export default LoginForm;