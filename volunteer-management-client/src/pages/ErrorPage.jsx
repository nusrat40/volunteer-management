import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import error from "../assets/error.png";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <Helmet>
        <title>Error Page | Volunteer Management</title>
      </Helmet>

   
      <img src={error} alt="Error 404" className="w-96 max-w-full" />

     
      <h2 className="text-6xl font-bold text-[#27ae8a] mt-6">Oops!</h2>
      <p className="text-lg text-gray-600 mt-2">
        We can't seem to find the page you're looking for.
      </p>
      <p className="text-gray-500 mt-2">
        Error Code: <span className="font-semibold">404</span>
      </p>

     
      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-[#27ae8a] text-white font-semibold text-lg rounded-full shadow-md hover:bg-[#1e8b6d] transition-all duration-300">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
