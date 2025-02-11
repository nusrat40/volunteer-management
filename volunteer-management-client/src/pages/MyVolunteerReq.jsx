import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const MyVolunteerReq = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {

    // fetch(`https://volunteer-management-server-inky.vercel.app/volunteer-request?email=${user.email}`)
    //   .then((res) => res.json())
    //   .then((data) => setRequests(data));

      axios.get(`https://volunteer-management-server-inky.vercel.app/volunteer-request?email=${user.email}`,{withCredentials:true})
      .then(res => setRequests(res.data))


  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://volunteer-management-server-inky.vercel.app/volunteer-request/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Request has been deleted.",
                icon: "success",
              });
            }
            const remaining = requests.filter((request) => request._id !== id);
            setRequests(remaining);
          });
      }
    });
  };

  return (
    <div className="container mx-auto px-12 mt-20">
       <Helmet>
              <title>My Volunteer Request Posts | Volunteer Management</title>
            </Helmet>
      <h1 className="text-4xl text-center font-bold mb-5">
        My Volunteer Request Posts
      </h1>

      {requests.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-600">
            You have no volunteer requests at the moment. Explore opportunities
            and start contributing!
          </p>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id}>
                  <td>{index + 1}</td>
                  <td>{request.title}</td>
                  <td>{request.category}</td>
                  <td>{request.location}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="btn btn-ghost btn-xs text-red-500 hover:bg-red-100"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyVolunteerReq;
