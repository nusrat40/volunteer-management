import React from 'react';

const Programs = ({volunteers}) => {



    return (
        <div>
            <h1 className="text-4xl text-center font-bold mb-10 container mx-auto">
            Engage with our ongoing Programs
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {volunteers.slice(0,3).map((volunteer) => (
          <div key={volunteer._id} className="card bg-base-100 image-full w-96 shadow-xl">
          <figure>
            <img
              src={volunteer.photo}
              alt="" />
          </figure>
          <div className="card-body justify-center items-center top-28">
            <h2 className="card-title text-3xl font-bold">{volunteer.title}</h2>
            <p>Category: {volunteer.category}</p>
            
          </div>
        </div>
          
        ))}
      </div>
            
        </div>
    );
};

export default Programs;