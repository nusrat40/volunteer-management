import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Register = () => {

    const {createUser,setUser,updateUserProfile} =useContext(AuthContext);

    const [error, setError] = useState("");

    const navigate=useNavigate();

    const handleRegister = e =>{

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name=e.target.name.value;
        const photo=e.target.photo.value;
        

        if(password.length < 6){
          setError("Password should be longer");
          return;
        }
        if (!/[A-Z]/.test(password)) {
          setError( "Password must include at least one uppercase letter");
          return;
        }
        if (!/[a-z]/.test(password)) {
          setError( "Password must include at least one lowercase letter");
          return;
          
        }


        createUser(email,password)
        .then(result=>{
            const user = result.user;
            setUser(user);
            updateUserProfile({displayName:name,photoURL:photo})
            .then(()=>{
                 navigate("/");
            })
            .catch(error=>{
                toast.error(error.message);
                
            })
            
            toast.success('User created Successfully');
            
        })
        .catch((error) => {
            toast.error(error.message);
        
            
          })

        
    }


  return (
    <div className=" ml-0 md:ml-10">
       <Helmet>
              <title>Register | Volunteer Management</title>
            </Helmet>
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photo"
                className="input input-bordered"
              />
            </div>

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

            <div className="form-control relative">
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-purple-400">Register</button>
            </div>
          </form>
          <p className="ml-4 mb-4 text-center font-semibold">
            Already have an account?{" "}
            <Link className="underline" to="/login">
              Log in
            </Link>
          </p>

          <div className="mx-auto py-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
