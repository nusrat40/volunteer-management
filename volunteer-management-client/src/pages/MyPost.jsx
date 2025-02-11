import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const MyPost = () => {

    const {user}=useContext(AuthContext);
    const [myPosts,setMyPosts]=useState([]);

    useEffect(() => {
        if (user?.email) {
    
          fetch(`https://volunteer-management-server-inky.vercel.app/add-volunteer?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setMyPosts(data))
            .catch((error) => {
              toast.error(error.message);
            });


        }
      }, [user?.email]);


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
    
            fetch(`https://volunteer-management-server-inky.vercel.app/volunteer/${id}`,{
                method:'DELETE'
            })
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
                if (data.deletedCount > 0) {
    
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your Post has been deleted.",
                    icon: "success",
                  });
                }
                const remaining = myPosts.filter(myPost=> myPost._id !== id);
                setMyPosts(remaining);
              
              });
          }
        });
      };
    
    



    return (
        <div className='container mx-auto px-12 mt-20'>
           <Helmet>
                  <title>My Posts | Volunteer Management</title>
                </Helmet>
        <h1 className="text-4xl text-center font-bold  mb-5">
          My Volunteer Need Posts
        </h1>
  
        {myPosts.length === 0 ? (
          <p className="text-center text-green-500">No Posts found!</p>
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
                {myPosts.map((myPost, index) => (
                  <tr key={myPost._id}>
                    <td>{index + 1}</td>
                    <td>{myPost.title}</td>
                    <td>{myPost.category}</td>
                    <td>{myPost.location}</td>
                    <td className='space-y-2'>
                     <Link to={`/update-post/${myPost._id}`}>
                     <button className="btn btn-outline btn-warning md:mr-4 mr-2">
                        Update
                      </button>
                     </Link>
                      <button
                        onClick={() => handleDelete(myPost._id)}
                        className="btn btn-outline btn-error"
                      >
                        Delete
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

export default MyPost;