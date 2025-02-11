import React from 'react';
import card1 from '../assets/card1.svg';
import card2 from '../assets/card2.svg';
import card3 from '../assets/card3.svg'

const OurCause = () => {
    return (
        <div className='bg-[#eafaf6] container mx-auto p-24'>
            <h1 className='text-4xl font-bold text-center mb-10'>How can you support our cause?</h1>
            <div className='md:flex gap-2 space-y-4 md:space-y-0'>
                <div className='space-y-2 bg-white p-4 rounded-md'>
                    <img className='bg-yellow-200  w-16 rounded-full p-2' src={card1} alt="" />
                    <h2 className='text-2xl font-semibold'>Financial contributions</h2>
                    <p className='text-gray-600'>With your support, we can fund vital programs, expand our reach, and make a tangible difference.</p>
                </div>
                <div className='space-y-2 bg-white p-4 rounded-md'>
                    <img className='bg-yellow-200 w-16 rounded-full p-2' src={card2} alt="" />
                    <h2 className='text-2xl font-semibold'>Volunteer with us</h2>
                    <p className='text-gray-600'>Whether it's mentoring, organizing events, or offering your expertise, every contribution counts.</p>
                </div>
                <div className='space-y-2 bg-white p-4 rounded-md'>
                    <img className='bg-yellow-200 w-16 rounded-full p-2' src={card1} alt="" />
                    <h2 className='text-2xl font-semibold'>Devote your time</h2>
                    <p className='text-gray-600'>Volunteering with us offers a chance to contribute meaningfully to our mission, enriching lives.</p>
                </div>
                
            </div>
            
        </div>
    );
};

export default OurCause;