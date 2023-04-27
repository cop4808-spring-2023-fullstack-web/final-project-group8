import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import axios from "axios";
import { auth } from '../configs/firebase.js'

const createUser = async (user, favoriteMovies = []) => {
  try {
    const userID = auth.currentUser.uid;
    user.firebaseUID = userID;
    const response = await axios.post('http://localhost:5678/AddUser', {
      user,
      favoriteMovies,
    });
    if (response.status !== 200) {
      throw new Error('Failed to create user');
    }
    const result = response.data;
    console.log(`Created user with ID ${result.UserID}`);
  } catch (error) {
    console.error(error);
  }
};


const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setName] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      await createUser({ email });  //Move to SignUP
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="background-image" style={{backgroundImage: "url(https://wallpaperaccess.com/full/1512223.jpg)", 
        zIndex: "1",}}>
      <div className="overlay"> </div>
      <div className="p-4 box flex-column align-items-center text-center">
        <h2 className="mb-3" style={{color:"white"}}>Register Today</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3 mt-3 fields" controlId="formBasicName">
            <Form.Control
              type="name"
              placeholder="FULL NAME"
              onChange={(e) => setName(e.target.value)}
              style={{borderRadius: "35px", height: "40px", paddingLeft: "15px", fontSize: "13px"}}
            />
          </Form.Group>


          <Form.Group className="mb-3 mt-3 fields" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="EMAIL ADDRESS"
              onChange={(e) => setEmail(e.target.value)}
              style={{borderRadius: "35px", height: "40px", paddingLeft: "15px", fontSize: "13px"}}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-3 fields" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
              style={{borderRadius: "35px", height: "40px", paddingLeft: "15px", fontSize: "13px"}}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-3 fields" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="CONFIRM PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
              style={{borderRadius: "35px", height: "40px", paddingLeft: "15px", fontSize: "13px"}}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button className=" login-btn" variant="primary" type="Submit" 
            style= {{height: "45px", borderRadius: "35px", fontWeight: "700", width:"auto"}}>
              SIGN UP
            </Button>
          </div>
        </Form>

        <div className="p-4 mt-3 text-center" style= {{color:"white"}}>
        Already have an account? <Link to="/login">  LOGIN</Link>
      </div>

      </div>
      </div>
    </>
  );
};

export default Signup;