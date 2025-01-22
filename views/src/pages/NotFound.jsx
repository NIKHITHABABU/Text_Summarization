import React from 'react'
import Navbar from '../components/Navbar'
import shock from '../assets/images/shock.gif';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import config from '../../../config/config.js';

const NotFound = () => {

    let url = window.location.pathname;
    url = url.slice(1);
    url = url.charAt(0).toUpperCase() + url.slice(1);

    return (
        <>
        <Helmet><title>{config.name} - 404</title></Helmet>
            <Navbar />
            <div className='bg-[#2C3140] font-one text-white text-2xl min-h-screen p-16'>
                 {url}<br />
                <p className='text-xl text-center mt-16'>
                    Working on it....
                </p>
                <center>
                    <img src={shock} alt="loading..." className='opacity-75 mix-blend-multiply' />
                </center>
            </div>
            <Footer />
        </>
    )
}

export default NotFound
