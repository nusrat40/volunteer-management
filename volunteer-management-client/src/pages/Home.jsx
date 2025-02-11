import React from 'react';
import Banner from '../components/Banner';
import VolunteerNeedNow from '../components/VolunteerNeedNow';
import { useLoaderData } from 'react-router-dom';
import OurCause from '../components/OurCause';
import Programs from '../components/Programs';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    const volunteers = useLoaderData();


    return (
        <div className='space-y-20'>
             <Helmet>
                    <title>Home | Volunteer Management</title>
                  </Helmet>
            <Banner></Banner>
            <VolunteerNeedNow volunteers={volunteers}></VolunteerNeedNow>
            <OurCause></OurCause>
            <Programs volunteers={volunteers}></Programs>
        </div>
    );
};

export default Home;