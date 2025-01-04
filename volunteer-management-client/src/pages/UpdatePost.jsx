import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdatePost = () => {
  const volunteers = useLoaderData();

  const {
    _id,
    photo,
    title,
    des,
    category,
    location,
    number,
    deadline,
    email,
    name,
  } = volunteers;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(
    deadline ? new Date(deadline) : new Date()
  );

  const handleUpdatePost = (e) => {
    e.preventDefault();

    const photo = e.target.photo.value;
    const title = e.target.title.value;
    const des = e.target.description.value;
    const category = e.target.category.value;
    const location = e.target.location.value;
    const number = e.target.number.value;
    const updatedDeadline = startDate;

    const updatedPost = {
      photo,
      title,
      des,
      category,
      location,
      number,
      deadline:updatedDeadline,
    };

    //send data to the server
    fetch(`https://volunteer-management-server-inky.vercel.app/volunteer/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Post updated added successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
        navigate("/");
      });
  };

  return (
    <div className="bg-purple-50 p-24">
       <Helmet>
              <title>Update Post | Volunteer Management</title>
            </Helmet>
      <h2 className="text-3xl font-extrabold">Update Volunteer Need Post</h2>
      <form onSubmit={handleUpdatePost}>
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
                className="input input-bordered w-full"
                defaultValue={photo}
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
                defaultValue={title}
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
                defaultValue={des}
              />
            </label>
          </div>

          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <label className="input-group">
              <select
                defaultValue={category}
                name="category"
                className="select select-ghost w-full h-[45px] rounded-lg input-bordered bg-white"
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
                defaultValue={location}
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
                defaultValue={number}
              />
            </label>
          </div>

          <div className="form-control md:w-1/3 ml-4">
            <label className="label">
              <span className="label-text">Deadline</span>
            </label>
            <label className="input-group">
              <DatePicker
                className="border p-2 rounded-md md:w-[400px] h-[50px]"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="P"
                placeholderText="Select a deadline"
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
                value={user?.email}
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
                value={user?.displayName}
                readOnly
              />
            </label>
          </div>
        </div>

        <input
          type="submit"
          value="Update Post"
          className="btn btn-block bg-purple-400"
        />
      </form>
    </div>
  );
};

export default UpdatePost;
