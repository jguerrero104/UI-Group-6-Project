// src/components/Contact.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder logic for form submission
    toast.success('Thank you for reaching out! We will get back to you shortly.');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
      <p className="text-gray-600 mb-6 text-center">
        Have questions or feedback? Fill out the form below and we'll get in touch!
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-2 border rounded mt-1"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>

      {/* Credits Section */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Credits</h3>
        <ul className="text-gray-600 space-y-1">
          <li>Marlet Garcia</li>
          <li>Hannah Perez</li>
          <li>Lauren Martinez</li>
          <li>Michael Garlow</li>
          <li>Jose Guerrero</li>
          <li>Joshua Catzoela</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
