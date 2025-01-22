import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import config from '../../../config/config.js'

const About = () => {
  return (
    <>
      <Helmet><title>{config.name} - About Us</title></Helmet>
      <Navbar />
      <div className='bg-[#2C3140] min-h-screen font-one text-white p-16 text-xl'>
        <h1 className='text-2xl pb-3'>About Us.</h1>
        <div className='pl-3 pr-3 text-justify '>
          {/* <p >We are engineering students working on an AI-based text summarizer. We are passionate about using technology to solve real-world problems, and we believe that our text summarizer can help people save time and effort by providing them with concise and informative summaries of long texts.</p> <br /> */}
          <p className='indent-20'>
            Text summarizer is based on state-of-the-art machine learning techniques. It can summarize texts of any length, from short news articles to long research papers. It can also be used to summarize different types of texts, including news articles, scientific papers, blog posts.
            Goal is to develop a text summarizer that is accurate, reliable,minimal, and easy to use. We want our text summarizer to be a valuable tool for students, researchers, professionals, and anyone else who needs to quickly understand the main points of a long text.
          </p>
          <br />
          {/* <p className='indent-20'>
            We are currently in the development phase of our project, but we have made significant progress so far. We have trained our text summarizer on a large dataset of texts, and it is now able to generate accurate and informative summaries of a wide variety of texts.
            We are excited to continue developing our text summarizer and to make it available to the public in the near future. We believe that our text summarizer has the potential to revolutionize the way people read and understand information.
          </p> */}
          <br />
          {/* <div className='pl-8'>
            Team Members :<br />
            Dhanush<br />
            Sajan<br /><br />
           Courtesy :<br />
            Anandhu Nair J <br />
            Vaishnav B L
          </div> */}

          <br />
          <p>
            If you have any questions or feedback about our project, please feel free to contact us.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
