import React from 'react';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    return (
        <div className='text-center m-10 text-purple-400'>
             <Helmet>
                    <title>Error Page | Volunteer Management</title>
                  </Helmet>
        <h2 className='text-5xl'>Page not found</h2>
        <p>Status:404</p>

    </div>

    );
};

export default ErrorPage;