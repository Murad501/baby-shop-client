import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { darkProvider } from "../../../Context/DarkContext";

const ContactUs = () => {
  const { isDark } = useContext(darkProvider);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    event.target.reset()
    toast.success('Your email successfully sent')
    console.log(form);
  };
  return (
    <div className="mt-28 mb-10">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h1
        className={`text-4xl font-bold text-center mb-5 ${
          !isDark && "text-rose-400"
        }`}
      >
        Contact Us
      </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`border bg-transparent ${
              isDark ? "border-gray-800 " : "border-rose-400"
            } p-2 w-full rounded-sm focus:outline-none`}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`border bg-transparent ${
              isDark ? "border-gray-800 " : "border-rose-400"
            } p-2 w-full rounded-sm focus:outline-none`}
            required
          />
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            className={`border bg-transparent ${
              isDark ? "border-gray-800 " : "border-rose-400"
            } p-2 w-full rounded-sm focus:outline-none`}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className={`border bg-transparent ${
              isDark ? "border-gray-800 " : "border-rose-400"
            } p-2 w-full rounded-sm focus:outline-none h-32`}
            required
          />
        </div>
        <div className="mb-6 flex justify-end items-center">
          <button
            type="submit"
            className={`${
              isDark
                ? "border-gray-800 border hover:text-white"
                : "bg-rose-400 text-white"
            } font-semibold px-8 py-2 rounded-none mt-5`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
