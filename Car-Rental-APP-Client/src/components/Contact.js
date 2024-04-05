import React from "react";
import emailjs from "emailjs-com";
import Footer from "../pages/Footer";
import DefaultLayout from "./DefaultLayout";
import { message } from "antd";
import { notification } from "antd";
const Contact = () => {
  const send = (e) => {
    e.preventDefault();

    
      fetch("http://localhost:2000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          subject: e.target.subject.value,
          message: e.target.message.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    e.target.reset();
    notification.success({
      message: 'Thank you for Contacting us!',
      description: 'Our team will get in touch with you ASAP.',
    });
  };

  return (
    <>
      <DefaultLayout />
      <div className="contact">
        {" "}
        <h2
          style={{
            color: "white",
            marginBottom: "2rem",
            display: "block",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          Contact
          <span style={{ color: "#00ffffdf" }}> US</span>
        </h2>
        <div>
          <div className="contact-container">
            <form onSubmit={send}>
              <div className="row mx-auto">
                <div className="col-8 form-group mx-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <textarea
                    className="form-control message-area"
                    placeholder="Message"
                    name="message"
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Send Message"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
