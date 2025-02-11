import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());

  const handleAddVolunteer = (e) => {
    e.preventDefault();

    const photo =e.target.photo.value;
    const title =e.target.title.value;
    const des = e.target.description.value;
    const category =e.target.category.value;
    const location = e.target.location.value;
    const number =e.target.number.value;
    const deadline = startDate;
    const email =user?.email;
    const name=user?.displayName;

    const addVolunteer = {photo,title,des,category,location,number,deadline,email,name};


    //send data to the server
    fetch('https://volunteer-management-server-inky.vercel.app/add-volunteer',{
        method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(addVolunteer)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.insertedId){
            Swal.fire({
                title: 'Success!',
                text: 'Volunteer need post added successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
        }
        navigate('/myPost');
    })

    

  };

  return (
    <div className="bg-[#eafaf6] p-24">
       <Helmet>
        <title>Add Volunteer | Volunteer Management</title>
      </Helmet>
      <h2 className="text-3xl font-extrabold">Add Volunteer</h2>
      <form onSubmit={handleAddVolunteer}>
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
              />
            </label>
          </div>

          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <label className="input-group">
              <select
                defaultValue="Pick a category"
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
              />
            </label>
          </div>

          <div className="form-control md:w-1/3 ml-4">
            <label className="label">
              <span className="label-text">Deadline</span>
            </label>
            <label className="input-group">
            <DatePicker 
            className='border p-2 rounded-md  md:w-[400px] h-[50px]'
             selected={startDate} onChange={(date) => setStartDate(date)} />
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
          value="Add Volunteer"
          className="btn btn-block bg-[#27ae8a] text-white"
        />
      </form>
    </div>
  );
};

export default AddVolunteer;
