import React from "react";
import AllVolunteerCard from "./AllVolunteerCard";
import { Link } from "react-router-dom";

const VolunteerNeedNow = ({volunteers}) => {


    const sortedData = [...volunteers].sort((a,b)=> {
        const dateA = new Date (a.deadline);
        const dateB = new Date (b.deadline);
        return dateA-dateB;
    }
        
    );


  return (
    <div className="container mx-auto px-12 mb-20">
      <div className="mb-10 space-y-3 md:w-1/3 text-center mx-auto">
      <h1 className="text-3xl text-center font-bold">
      <span className="text-[#27ae8a]">Volunteers</span> Needs Now
      </h1>
      <p>By taking part in volunteer activities, you can help those in need and make a valuable contribution to our community.</p>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {
          sortedData.slice(0,6).map(volunteer=> <AllVolunteerCard key={volunteer._id} volunteer={volunteer}></AllVolunteerCard>)
        }
      </div>

      <div className="text-center mt-6">
        <Link to='/all-volunteer'>
        <button  className="btn btn-neutral font-bold w-52">SEE ALL</button>
        </Link>

      </div>
    </div>
  );
};

export default VolunteerNeedNow;
