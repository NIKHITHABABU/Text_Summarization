import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import config from "../../../config/config.js";

const Contact = () => {
  return (
    <>
    <Helmet><title>{config.name} - Contact Us</title></Helmet>
      <Navbar />
      <div className="bg-[#2C3140] min-h-screen font-one text-white p-16 text-justify text-2xl">
        <div className="text-2xl pb-3 ">Contact Us.</div>
        <p className="pb-3 ">
          We're thrilled to hear from you and are here to assist in any way we
          can. Whether you have inquiries, feedback, or just want to chat, our
          team is ready to help. Get in touch with us through the following
          means: <br />
        </p>
        <p className="pb-3">
          For general inquiries or assistance, drop us an email.
        </p>
        Feedback:
        <p className="pb-3">Your feedback is valuable to us. If you have suggestions, thoughts, or feature requests, please share them with us.</p>
        <div className="pb-3">
          Social Media: Connect with us on our social media channels for
          updates, and more:
          <ul className="p-2">
            <li>
              Discord:
            </li>
            <li>
              Github:
            </li>
            <li>
              Instagram:
            </li>
          </ul>
        </div>
        We Value Your Input:
        <p className="pb-3">
          Your thoughts and suggestions are crucial in helping us
          enhance our text summarizing tool. We appreciate your time and effort
          in sharing your experiences and recommendations with us.
        </p>
        Thank you for
        being a part of our journey in revolutionizing text summarization!
      </div>
      <Footer />
    </>
  );
};

export default Contact;
