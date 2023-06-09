import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import GoogleButton from "react-google-button";
import { useAuth } from "../context/UserAuthContext";
import { auth } from '../configs/firebase.js'

/**
 * A brief description of what the function does.
 *
 * @param {Type} paramName - Description of the parameter.
 * @returns {Type} Description of the return value.
 * @throws {Type} Description of the exception thrown.
 */
const createUser = async (user, favoriteMovies = []) => {
  try {
    const userID = auth.currentUser.uid;
    const userEmail = auth.currentUser.email;
    const userName = auth.currentUser.displayName;
    user.firebaseUID = userID;
    user.fullName = userName;
    user.email = userEmail;
    const response = await axios.post('https://movieserver.herokuapp.com/AddUser', {
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const [displayname, setDisplayName] = useState("");
  const { logIn, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      await createUser({}); // Add DisplayName
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <div className="background-image" style={{backgroundImage: "url(https://wallpaperaccess.com/full/1512223.jpg)", 
        zIndex: "1",}}>
      <div className="overlay1"> </div>
      <div className="p-4 box flex-column align-items-center text-center">
        <h2 className="mb-3" style={{color:"white"}}>Welcome!</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <div>
       <GoogleButton
       className="g-btn"
       type="dark"
       style={{backgroundColor: "#38CDD7", borderRadius: "25px", width: "auto"}}
      onClick={handleGoogleSignIn}
      />
</div>

        <Form onSubmit={handleSubmit}>
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
              style={{ borderRadius: "35px", height: "40px", paddingLeft: "15px", fontSize: "13px", maxWidth:"400px"}}

            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button className="login-btn" type="Submit" 
              style= {{height: "45px", borderRadius: "35px", fontWeight: "700", width:"auto"}}>
              LOGIN
            </Button>
          </div>
        </Form>

        <div className="p-4 mt-3 text-center" style={{color:"white"}}>
        New User? <Link to="/signup">Sign up today</Link>
      </div>
      
      </div>
      </div>
    
    </>
  );
};

export default Login;
