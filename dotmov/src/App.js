import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // import Router component
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./pages/home";
import Details from "./pages/details";

import ProtectedRoute from "./components/protectedRoutes";
import { UserAuthContextProvider } from "./context/UserAuthContext";

const App = () => {
  return (
    <UserAuthContextProvider>
      <Router>
        {" "}
        {/* Wrap Routes component in Router component */}
        <NavigationBar />
        <Routes>
          <Route
            path="/home"
            element={<ProtectedRoute>{/* <Home /> */}</ProtectedRoute>}
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>{" "}
      {/* Close Router component */}
    </UserAuthContextProvider>
  );
};

export default App;
