import React from 'react';
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom';

const AllVolunteerCard = ({volunteer}) => {

    const {photo,title,des,category,deadline,_id}=volunteer;
    const navigate = useNavigate();


    return (
        <div>
        <div className="card bg-base-100   shadow-xl h-[500px]">
          <figure className=" p-4">
            <img src={photo} alt="" className="rounded-xl w-full h-96 object-cover" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold">{title}</h2>
            <p>{des}</p>
           <div className='md:flex gap-4 text-gray-600'>
            <p>Category: {category}</p>
            <p>Deadline: {format(new Date(deadline), 'P')}</p>
           </div>
  
            <div className="card-actions">
              <button 
              onClick={()=>navigate(`/volunteer-details/${_id}`)}
              className="btn bg-purple-400 font-bold">View Details</button>
            </div>
  
          </div>
        </div>
      </div>
  
    );
};

export default AllVolunteerCard;