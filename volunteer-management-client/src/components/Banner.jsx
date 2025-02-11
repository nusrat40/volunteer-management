import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const images = [img1, img2, img3];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero bg-[#27ae8a] min-h-screen p-16 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-3 lg:p-6">
        <div>
          <h1 className="text-6xl font-bold">Support your community today</h1>
          <p className="text-xl text-white py-6">
            By taking part in volunteer activities, you can help those in need
            and make a valuable contribution to our community. It's also a great
            way to learn new skills, meet new people, and gain valuable
            experience.
          </p>
          <button className="btn btn-neutral text-white font-bold">
            Be a Volunteer
          </button>
        </div>

        {/* Image Slider with Framer Motion */}
        <div className="relative w-full h-96 overflow-hidden rounded-lg">
          <AnimatePresence>
            <motion.img
              key={index}
              src={images[index]}
              alt="Banner"
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Banner;
