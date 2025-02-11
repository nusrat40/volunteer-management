import React, { useContext, useState } from "react";
import { data, useLoaderData, useNavigate} from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import {format} from 'date-fns';
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const BeVolunteer = () => {
    const volunteer = useLoaderData();
  
  const { user } = useContext(AuthContext);
  const navigate =useNavigate();
  

  const {_id,photo,title,des,category,location,number,deadline,email,name}=volunteer;

//   console.log(_id);
  

  const [suggestion,setSuggestion]=useState("");

  const handleRequest = e=>{

    e.preventDefault();

    const requestData={
        postId: _id,
        photo,
        title,
        category,
        location,
        number,
        deadline,
        organizerName: name,
        organizerEmail: email,
        volunteerName: user?.displayName,
        volunteerEmail: user?.email,
        suggestion,
        status: "requested",
    };

    fetch('https://volunteer-management-server-inky.vercel.app/volunteer-request', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Request has been sent!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/myVolunteerReq')
            }
        })


  }

  return (
    <div className="mt-20">
       <Helmet>
              <title>Be a Volunteer | Volunteer Management</title>
            </Helmet>
      <h1 className="text-4xl text-center font-bold mb-5">
        Be a Volunteer
      </h1>

      <div className="bg-[#eafaf6] p-10 rounded-lg">
        <form onSubmit={handleRequest}>
          {/* form row */}
          <div className="md:flex mb-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Thumbnail</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="photo"
                  placeholder="thumbnail"
                  value={photo}
                  className="input input-bordered w-full"
                  readOnly
                />
              </label>
            </div>

            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  className="input input-bordered w-full"
                  value={title}
                  readOnly
                />
              </label>
            </div>
          </div>

          {/* form row */}
          <div className="md:flex mb-6">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="description"
                  placeholder="description"
                  className="input input-bordered w-full"
                  value={des}
                  readOnly
                />
              </label>
            </div>

            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <label className="input-group">
                <select
                  name="category"
                  className="select select-ghost w-full h-[45px] rounded-lg input-bordered bg-white"
                  value={category}
                  readOnly
                >
                  <option disabled>Pick a category</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Social Service</option>
                  <option>Animal Welfare</option>
                </select>
              </label>
            </div>
          </div>

          {/* form row */}
          <div className="md:flex mb-6">
            <div className="form-control md:w-1/3">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="location"
                  placeholder="location"
                  className="input input-bordered w-full"
                  value={location}
                  readOnly
                />
              </label>
            </div>

            <div className="form-control md:w-1/3 ml-4">
              <label className="label">
                <span className="label-text">No of Volunteers</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  name="number"
                  placeholder="No of Volunteers needed"
                  className="input input-bordered w-full"
                  value={number}
                  readOnly
                />
              </label>
            </div>

            <div className="form-control md:w-1/3 ml-4">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <label className="input-group">
                <DatePicker
                  className="border p-2 rounded-md w-[350px] md:w-[400px] h-[50px]"
                  
                  value= {format(new Date(deadline), 'P')}
                  readOnly
                />
              </label>
            </div>
          </div>

          {/* form row */}
          <div className="md:flex mb-6">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Organizer Email</span>
              </label>
              <label className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  value={email}
                  readOnly
                />
              </label>
            </div>

            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Organizer Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered w-full"
                  value={name}
                  readOnly
                />
              </label>
            </div>
          </div>

           {/* form row */}
           <div className="md:flex mb-6">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Volunteer Email</span>
              </label>
              <label className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  value={user?.email}
                  readOnly
                  
                />
              </label>
            </div>

            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Volunteer Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered w-full"
                  value={user?.displayName}
                  readOnly
                  
                />
              </label>
            </div>
          </div>

          {/* form row */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Suggestion</span>
            </label>
            <textarea
              name="suggestion"
              className="textarea textarea-bordered w-full"
              placeholder="Add your suggestion"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            ></textarea>
          </div>


          <input
            type="submit"
            value="Request"
            className="btn btn-block bg-[#27ae8a] text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default BeVolunteer;
