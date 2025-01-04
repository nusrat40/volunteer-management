import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const VolunteerDetails = () => {
  const volunteer = useLoaderData();

  const { user } = useContext(AuthContext);

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
  } = volunteer;

  return (
    <div className="bg-base-100   shadow-xl mt-10">
      <Helmet>
        <title>Volunteer Details | Volunteer Management</title>
      </Helmet>
      <div className="p-8 rounded-lg flex flex-col md:flex-row gap-8">
        <div className="space-y-2">
          <img className="rounded-xl w-96" src={photo} alt="" />
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-gray-600">Category: {category}</p>
          <p className="text-gray-600">No of Volunteer needed: {number}</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-2xl">{des}</p>
          <p>Location: {location}</p>
          <p>Deadline: {format(new Date(deadline), "P")}</p>

          <h2 className="text-xl font-semibold">Organizer name: {name}</h2>

          <h2 className="font-semibold">Email: {email}</h2>

          {/* <Link to={`/be-volunteer/${_id}`}>
            <button className="btn bg-purple-400 font-bold">
              Be a Volunteer
            </button>
            </Link> */}

          {number > 0 ? (
            <Link to={`/be-volunteer/${_id}`}>
              <button className="btn bg-purple-400 font-bold">
                Be a Volunteer
              </button>
            </Link>
          ) : (
           <div>
             <button
              className="btn bg-gray-400 font-bold cursor-not-allowed"
              disabled
              title="Volunteers are not currently needed for this post."
            >
              Be a Volunteer
            </button>
            <p className="text-red-500 font-semibold">Volunteers are not currently needed for this post.
            </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetails;
