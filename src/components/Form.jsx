import { useState } from "react";
import FileUpload from "./ui/FileUpload";
import emailjs from "emailjs-com";
import PropTypes from "prop-types";

function TicketForm({ ticketGenerated, setTicketGenerated }) {
  const [formData, setFormData] = useState({
    avatar: null,
    fullName: "",
    email: "",
    github: "",
  });

  const [ticketNumber, setTicketNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const generatedTicketNumber = `098${Math.floor(Math.random() * 100)}`;
    setTicketNumber(generatedTicketNumber);

    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    const emailParams = {
      from_name: "Coding Conf",
      to_name: formData.fullName,
      to_email: formData.email,
      github: formData.github,

      ticketNumber: generatedTicketNumber,
    };

    try {
      await emailjs.send(serviceID, templateID, emailParams, publicKey);
      //   alert(`Ticket sent to ${formData.email}!`);
      setTicketGenerated(true);
    } catch (error) {
      console.error("Failed to send email:", error);
      setErrorMessage(
        "Failed to send the email. Please check the email address and try again."
      );
      setTicketGenerated(false);
    }
  };
  const isEmailValid = formData.email.match(/[a-zA-Z0-9._%+-]+@gmail\.com/);
  return (
    <div className="app-container">
      {!ticketGenerated ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="avatar" className="text-xl text-[#E0E0E0]">
              Upload Avatar
            </label>
            <FileUpload
              onChange={(files) =>
                handleChange({ target: { name: "avatar", files } })
              }
            />

            <label htmlFor="fullName" className="text-xl text-[#E0E0E0]">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label htmlFor="email" className="text-xl text-[#E0E0E0]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
              title="Email must be in the format ____@gmail.com"
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  "Please enter a valid email address in the format ____@gmail.com"
                );
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
            />
            {formData.email && !isEmailValid && (
              <p className="text-red-500 text-sm">
                Email format is incorrect. It must end with @gmail.com.
              </p>
            )}
            <label htmlFor="github" className="text-xl text-[#E0E0E0]">
              GitHub Username
            </label>
            <input
              type="text"
              id="github"
              name="github"
              placeholder="Enter your GitHub username"
              value={formData.github}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={`btn ${
                !isEmailValid ? "bg-gray cursor-not-allowed" : ""
              }`}
              disabled={!isEmailValid}
            >
              Generate My Ticket
            </button>
          </form>

          {errorMessage && (
            <div className="error-message text-red-500 mt-4">
              {errorMessage}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="success-message">
            <h2 className="lg:text-4xl sm:text-[40px] ms:text-[30px] xs:text-[30px]">
              Congrats,{" "}
              <span className="bg-gradient-to-r from-[#f87364] to-white bg-clip-text text-transparent">
                {formData.fullName}
              </span>
              ! <br /> Your ticket is ready.
            </h2>
          </div>
          <p className="text-center text-lg tracking-wide m-10">
            We&apos;ve emailed your ticket to <br />{" "}
            <span className="text-[#f87364]"> {formData.email}</span> and will
            send updates in<br></br> the run up to the event.
          </p>
          <div className="bg-ticket-bg bg-contain bg-no-repeat">
            <div className="relative lg:p-10 sm:p-4 ms:p-3 xs:p-2 lg:ml-0 xl:mr-[12vw]">
              <div>
                <img src="./logo-full.svg" alt="Logo" />
              </div>
              <span className="text-gray text-sm">
                Jan 31, 2025 / Austin, TX
              </span>
              <div className="flex lg:mt-20 sm:mt-10 xs:mt-4 ms:mt-10">
                <span>
                  {formData.avatar && (
                    <img
                      src={URL.createObjectURL(formData.avatar)}
                      alt="Avatar"
                      className="h-16 w-16 rounded-lg mr-4"
                    />
                  )}
                </span>
                <div>
                  <span className="sm:text-xl ms:text-xl lg:text-xl xs:text-lg">
                    {formData.fullName}
                  </span>
                  <div className="flex flex-row">
                    <img
                      src="./icon-github.svg"
                      className="mr-2"
                      alt="GitHub Icon"
                    />
                    @{formData.github}
                  </div>
                </div>
              </div>
              <div className="flex absolute top-0 lg:left-[456px] xl:left-[500px] items-center h-full  md:left-[69%] sm:right-8 xs:right-6">
                <span className="ticknumber text-gray-400 xs:text-xl ms:text-xl lg:text-2xl sm:text-2xl text-gray ">
                  #{ticketNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
TicketForm.propTypes = {
  ticketGenerated: PropTypes.bool.isRequired,
  setTicketGenerated: PropTypes.func.isRequired,
};
export default TicketForm;
