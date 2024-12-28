import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardWrapper from "../components/CardWrapper";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Header from "../components/Header";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
        email,
        password
    };
    const response = await axios.post("http://localhost:8000/api/v1/users/login", data);
        console.log(response)
        // if(response.status){

        // }else {

   
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <CardWrapper>
        <Header
          title="Login"
          subtitle="Welcome back! Please login to your account."
        />
        <form className="space-y-4 mt-6" onSubmit={formSubmitHandler}>
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </Button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-300">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:text-yellow-500">
            Sign up
          </Link>
        </p>
      </CardWrapper>
    </div>
  );
};

export default Login;
