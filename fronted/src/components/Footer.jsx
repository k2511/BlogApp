import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-3">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src={Logo}
              alt=""
              className="invert w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <h1 className="text-2xl sm:text-3xl font-bold">Logo</h1>
          </Link>
          <p className="text-sm leading-relaxed">
            Sharing insights, tutorials, and ideas on web development and tech.
          </p>
          <div className="text-sm space-y-1">
            <p>123 Blog St, Style City, NY 10001</p>
            <p>Email: support@blog.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li className="hover:text-red-500 cursor-pointer">Home</li>
            <li className="hover:text-red-500 cursor-pointer">Blogs</li>
            <li className="hover:text-red-500 cursor-pointer">About Us</li>
            <li className="hover:text-red-500 cursor-pointer">FAQs</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-red-500 cursor-pointer" />
            <FaInstagram className="hover:text-red-500 cursor-pointer" />
            <FaTwitterSquare className="hover:text-red-500 cursor-pointer" />
            <FaPinterest className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Stay in the Loop</h3>
          <p className="text-sm mb-4">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form action="" className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-2 rounded-l-md bg-gray-700 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 text-sm rounded-r-md hover:bg-red-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500">Blog</span>. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
