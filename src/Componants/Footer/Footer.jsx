import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { FaEnvelope, FaTwitter, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa'; // Import icons

export default function Footer() {
  const footerLinks = [
    { title: 'Categories', links: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Beverages'] },
    { title: 'About Us', links: ['Our Story', 'Contact Us', 'Blog', 'FAQ'] },
    { title: 'Customer Service', links: ['Help Center', 'Returns', 'Shipping', 'Terms & Conditions'] },
  ];

  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 transition-all duration-300 ease-in-out"> {/* Added transition */}
      <div className="container px-6 mx-auto space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center"> {/* Flexbox for logo and categories */}
          <div>
            <Link to="/" className="flex items-center"> {/* Use Link for routing */}
              <img src={logo} alt="Freshcart logo" className="h-10 transition-transform duration-300 hover:scale-105" /> {/* Added hover effect */}
            </Link>
          </div>
          <div className="md:flex md:space-x-8 mt-6 md:mt-0"> {/* Category links container */}
            {footerLinks.map((category) => (
              <div key={category.title} className="text-left md:text-left">
                <h3 className="text-lg font-medium mb-2">{category.title}</h3>
                <ul className="space-y-1">
                  {category.links.map((link) => (
                    <li key={link}>
                      <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300"> {/* Use Link and dynamic routing */}
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"> {/* Separator and bottom section */}
          <div className="text-sm text-center md:text-left">
            <span>© {new Date().getFullYear()} Freshcart. All rights reserved.</span>
            <div className="mt-2 md:mt-0"> {/* Added spacing for smaller screens */}
              <Link to="/privacy-policy" className="mr-4 hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0"> {/* Social icons */}
            <a href="#" className="social-icon" aria-label="Email"><FaEnvelope /></a>
            <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="social-icon" aria-label="GitHub"><FaGithub /></a>
            <a href="#" className="social-icon" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}