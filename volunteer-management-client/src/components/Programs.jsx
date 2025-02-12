import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Programs = ({ volunteers }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-12">
      <h1 className="text-4xl text-center font-bold mb-10">
        Engage with our <span className="text-[#27ae8a]"> Ongoing Programs</span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {volunteers.slice(0, 3).map((volunteer) => (
          <motion.div
            key={volunteer._id}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/all-volunteer")}
          >
            <img
              src={volunteer.photo}
              alt={volunteer.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-2xl font-bold">{volunteer.title}</h2>
              <p className="text-lg">{volunteer.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
