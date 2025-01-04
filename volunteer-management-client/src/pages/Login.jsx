import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaGoogle } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const Login = () => {

    const {signIn,signInWithGoogle} = useContext(AuthContext);

    const navigate = useNavigate();
    const location =useLocation();

    const from =location.state || '/';

    const handleLogin = e =>{

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email,password)
        .then(result=>{
            // console.log(result.user);
            navigate(from);
            
        })
        .catch((error) => {
            toast.error(error.message);
            
          });
    }


    const handleGoogleSignIn=()=>{
        signInWithGoogle()
        .then(result=>{
            console.log(result.user);
            navigate(from); 
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }



    return (
        <div className=" ml-0 md:ml-10">
           <Helmet>
                  <title>Login | Volunteer Management</title>
                </Helmet>
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold ">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
  
  
              </div>
  
              <div className="form-control mt-6">
                <button className="btn bg-purple-400">Login</button>
              </div>
            </form>
            <p className="ml-4 mb-4 text-center font-semibold">
              Don't Have an Account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </p>
  
            <div className="mx-auto py-4">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline btn-primary w-[300px] "
              >
                <FaGoogle></FaGoogle>
                Google Login
              </button>
            </div>
          </div>
        </div>
      </div>
  
  
    );
};

export default Login;