import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllVolunteerCard from "../components/AllVolunteerCard";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const AllVolunteer = () => {

  const [volunteers,setVolunteers]=useState([]);

  const [search, setSearch] = useState("");
  const [isCardLayout, setIsCardLayout] = useState(true);

  useEffect(()=>{
    const fetchVolunteers = async()=>{
        const {data} = await axios.get(`https://volunteer-management-server-inky.vercel.app/add-volunteer?search=${search}`);
        setVolunteers(data);
    }
    fetchVolunteers();
  },[search]);

  const toggleLayout = ()=>{
    setIsCardLayout(prev => !prev);
  };



  return (
    <div>
       <Helmet>
              <title>All Volunteer | Volunteer Management</title>
            </Helmet>
      <div className="md:flex justify-between">
        <h1 className="text-4xl text-center font-bold mb-5">
          All Volunteers need Posts
        </h1>

        <div className="flex flex-col md:flex-row gap-2">

        <div className="flex justify-between p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Enter Post Title"
           
          />

          <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-purple-500 rounded-md focus:outline-none">
            Search
          </button>
        </div>

        <button
            onClick={toggleLayout}
            className="px-2 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase bg-purple-500 rounded-md"
          >
            Change Layout
          </button>

        </div>
      </div>


      {/* <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {
          volunteers.map(volunteer=> <AllVolunteerCard key={volunteer._id} volunteer={volunteer}></AllVolunteerCard>)
        }
      </div> */}


{isCardLayout ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {volunteers.map((volunteer) => (
            <AllVolunteerCard key={volunteer._id} volunteer={volunteer} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                </tr>
              </thead>
  
              <tbody>
                {volunteers.map((volunteer, index) => (
                  <tr key={volunteer._id}>
                    <td>{index + 1}</td>
                    <td>{volunteer.title}</td>
                    <td>{volunteer.category}</td>
                    <td>{volunteer.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}



    </div>
  );
};

export default AllVolunteer;
