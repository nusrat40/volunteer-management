import React from "react";
import img from '../assets/img4.jpg'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20 mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-[#27ae8a]">About Us</h1>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          At <span className="font-bold text-[#27ae8a]">Voluntee</span>, we believe in the power of community service and its ability to create positive change. Our platform connects passionate volunteers with meaningful opportunities to make a difference.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <img
          src={img}
          alt="Volunteer Work"
          className="rounded-lg shadow-lg w-full"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Our mission is to empower individuals to give back to society by connecting them with organizations that need their help. Whether it's environmental conservation, education, or social work, we make volunteering accessible and impactful.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#27ae8a]">Diverse Opportunities</h3>
            <p className="mt-2 text-gray-700">
              We provide varied volunteering roles from community outreach to skill-based projects.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#27ae8a]">Easy Registration</h3>
            <p className="mt-2 text-gray-700">
              Our user-friendly platform allows you to find and join volunteer activities quickly.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#27ae8a]">Real Impact</h3>
            <p className="mt-2 text-gray-700">
              Track your contributions and see the difference you're making in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-800">Join Us Today!</h2>
        <p className="mt-4 text-lg text-gray-700">
          Become a part of a growing community of volunteers. Together, we can create a better world.
        </p>
        <a href="/register">
          <button className="mt-6 px-6 py-3 bg-[#27ae8a] text-white font-bold text-lg rounded-lg hover:bg-[#1e8b6a]">
            Get Started
          </button>
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
