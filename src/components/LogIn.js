import React, { useState } from "react";
import { Stack, Container, Form, Button } from "react-bootstrap";

import firebaseApp from "../credentials";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider} from "firebase/auth"

const auth = getAuth(firebaseApp);
const googleProviver = new GoogleAuthProvider();

const LogIn = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;
    console.log(email, password);
    if(isSigningUp){
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log(user);
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }

  }

  return (
    <Container>
      <Stack gap={3}>
        <h1>{isSigningUp ? "Registrate" : "Inicia sesión"}</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="dark" type="submit">
            {isSigningUp ? "Registrate" : "Inicia sesión"}
          </Button>
        </Form>

        <Button variant="primary" type="submit" style={{ width: "300px" }} onClick={()=> signInWithRedirect(auth, googleProviver)}>
          Acceder con Google
        </Button>

        <Button
          style={{ width: "300px" }}
          variant="secondary"
          onClick={() => setIsSigningUp(!isSigningUp)}
        >
          {isSigningUp
            ? "Ya tienes cuenta? Inicia sesión"
            : "No tienes cuenta? Registrate"}
        </Button>
      </Stack>
    </Container>
  );
};

export default LogIn;
