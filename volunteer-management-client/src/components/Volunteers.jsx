import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch("/volunteers.json")
      .then((res) => res.json())
      .then((data) => setVolunteers(data))
      .catch((err) => console.error("Error fetching volunteers:", err));
  }, []);

  return (
    <div className="container mx-auto px-8 py-12 bg-[#eafaf6]">
      <h2 className="text-4xl font-bold text-center mb-6">
        Meet Our <span className="text-[#27ae8a]">Volunteers</span>
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Our dedicated volunteers are the heart of our mission. Meet the people making a difference in communities every day.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {volunteers.map((volunteer) => (
          <motion.div
            key={volunteer.id}
            className="bg-white shadow-lg rounded-lg p-6 text-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={volunteer.photo}
              alt={volunteer.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-bold">{volunteer.name}</h3>
            <p className="text-gray-600 italic">{volunteer.message}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Volunteers;
