import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (element) => {
    console.log("Element", element)
    setLoading(true);
    setFile(element)
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const formData = new FormData();

      const timestamp = Math.floor(Date.now() / 1000);

      formData.append('file', element);
      formData.append('timestamp', timestamp.toString());
      formData.append('api_key', '911433549156892');
      // formData.append('signature', 'a781d61f86a6f818af');
      formData.append("upload_preset", "ipj7yyzc");
      
      // data.append("file", element);
      // data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      // data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      // data.append("api_key", "911433549156892");
      // data.append("api_key", "911433549156892");

      
      axios.post('https://api.cloudinary.com/v1_1/dhndgsfpc/image/upload', formData)
      .then(function (response) {
        console.log(response.data);
             setFormDetails({
          ...formDetails,
          file: response.data.url.toString(),
        })
      setLoading(false);

      })
      .catch(function (error) {
        console.log(error);
      });
      // await axios.post("https://api.cloudinary.com/v1_1/dhndgsfpc/image/upload", {
      //   method: "POST",
      //   body: data,
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(">>>>>>", data.url.toString())
      //     setFormDetails({
      //     ...formDetails,
      //     file: data.url.toString(),
      //   })
      // });
      
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const btnClick = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (file === "") return;

    try {
      await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",
          {
            formDetails,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Doctor application sent successfully",
          error: "Unable to send Doctor application",
          loading: "Sending doctor application...",
        }
      );

      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <section
        className="register-section flex-center apply-doctor"
        id="contact"
      >
        <div className="register-container flex-center contact">
          <h2 className="form-heading">Apply for Doctor</h2>
          <form className="register-form ">
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder="Enter your specialization"
              value={formDetails.specialization}
              onChange={inputChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter your experience (in years)"
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder="Enter your fees  (in INR)"
              value={formDetails.fees}
              onChange={inputChange}
            />
            Certificate:
            <input
            type="file"
            onChange={(e) => onUpload(e.target.files[0])}
            name="Certificate"
            placeholder="Certificate"
            id="profile-pic"
            className="form-input"
          />
            <button
              type="submit"
              className="btn form-btn"
              onClick={btnClick}
            disabled={loading ? true : false}
            
            >
              apply
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDoctor;
