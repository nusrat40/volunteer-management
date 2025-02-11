import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import team from '../assets/team.png';
import { motion } from "framer-motion";

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

  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="my-20 container mx-auto px-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>Volunteer Details | Volunteer Management</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:p-3 lg:p-6 gap-2">
        <motion.div className="space-y-2" variants={imageVariants}>
          <img className="rounded-xl w-96" src={photo} alt={title} />
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-gray-600">{category}</p>
          <p className="text-gray-600">No of Volunteer needed: {number}</p>
        </motion.div>

        <motion.div className="space-y-2" variants={containerVariants}>
          <p className="font-semibold text-2xl">{des}</p>
          <p>Location: {location}</p>
          <p>Deadline: {format(new Date(deadline), "P")}</p>

          <h2 className="text-xl font-semibold">Organizer name: {name}</h2>

          <h2 className="font-semibold">Email: {email}</h2>

          {number > 0 ? (
            <Link to={`/be-volunteer/${_id}`}>
              <button className="btn bg-[#27ae8a] text-white font-bold mt-4">
                Be a Volunteer
              </button>
            </Link>
          ) : (
            <div>
              <button
                className="btn bg-gray-400 font-bold cursor-not-allowed mt-4"
                disabled
                title="Volunteers are not currently needed for this post."
              >
                Be a Volunteer
              </button>
              <p className="text-red-500 font-semibold">
                Volunteers are not currently needed for this post.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div variants={imageVariants}>
          <img src={team} alt="team" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VolunteerDetails;
