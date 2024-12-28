import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CardWrapper from '../components/CardWrapper';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Header from '../components/Header';
import axios from 'axios';

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitHandler = async (e)=>{
        e.preventDefault();
        const data = {
            firstname,
            lastname,
            email,
            password
        }
        const response = await axios.post("http://localhost:8000/api/v1/users/signup", data)
        console.log(response)
    }

    return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <CardWrapper>
        <Header title="Sign Up" subtitle="Create your account and start your journey with us." />
        <form className="space-y-4 mt-6" onSubmit={formSubmitHandler}>
          <InputField id="firstname" label="First Name" placeholder="Enter your first name" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
          <InputField id="lastname" label="Last Name" placeholder="Enter your last name" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
          <InputField id="email" label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <InputField id="password" label="Password" type="password" placeholder="Create a password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            Sign Up
          </Button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-500">
            Log in
          </Link>
        </p>
      </CardWrapper>
    </div>
  );
};

export default Signup;
