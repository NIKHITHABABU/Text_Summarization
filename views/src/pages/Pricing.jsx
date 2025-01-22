import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import config from '../../../config/config.js'

const Pricing = () => {
  return (
    <>
      <Helmet><title>{config.name} - Pricing</title></Helmet>
      <Navbar />
      <div className='bg-[#2C3140] h-full font-one text-white p-16'>
        <h1 className='text-2xl pb-3'>
          Pricing.
        </h1>
        <div className='pl-3 pr-3 text-xl text-justify'>
          <p>
            We're thrilled to have you here as part of our early journey in creating the most efficient text summarizing tool. To ensure we provide you with the best possible product, we're currently in the beta testing phase. During this period, access to our platform and its full suite of features is entirely free for all our users.
          </p>
          <br />
          <p>
            What to Expect During Beta Testing:
          </p>
          <br />
          <p>
            Free Access: You can enjoy our premium text summarization services without any cost. Take advantage of our tools and features at no charge while we fine-tune and enhance the user experience.
          </p>
          <br />
          <p>
            Help Us Improve: Your feedback is incredibly valuable to us. As a beta user, you'll have the opportunity to share your thoughts, suggestions, and experiences, playing a pivotal role in shaping the future of our platform.
          </p>
          <br />
          <p>
            Access to New Features: Experience the latest updates and features we're continually developing. Be the first to explore new functionalities as we roll them out.
          </p>
          <br />
          <p>
            Why Beta Testing Matters: Beta testing allows us to ensure the highest quality of service before our official launch. It helps us identify and resolve any potential issues, refine our features, and tailor the tool to best suit your needs.
          </p>
          <br />
          <p>
            Our Commitment to You: Rest assured that although it's free during our beta phase, our commitment to providing an exceptional text summarization experience is unwavering. We're dedicated to delivering a top-notch product, and your involvement in this stage is crucial for achieving that goal.
          </p>
          <br />
          <p>
            Future Pricing: As we move towards our official launch, there will be various subscription plans tailored to meet different usage needs. However, for early adopters like you, there will be exclusive offers and discounts available based on your participation during our beta phase.
          </p>
          <br />
          <p>
            Join Us on This Exciting Journey: <br />
            Thank you for being a part of our beta testing community. Your support, feedback, and engagement will help us shape the future of text summarization.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Pricing
