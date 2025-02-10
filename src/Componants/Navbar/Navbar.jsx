import { Link, NavLink, useNavigate } from "react-router-dom";
import frechlogo from '../../assets/images/freshcart-logo.svg';
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { useWishlist } from '../../context/WishlistContext';
import FixedCartIcon from "../FixedCartIcon/FixedCartIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './Navbar.css';

export default function Navbar() {
  const { userToken, login, logout } = useContext(authContext); // Use user object
  const navigate = useNavigate();
  const { wishlistItems } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeLinkStyle = ({ isActive }) => ({
    color: isActive ? '#059669' : '#1a1a1a',
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar bg-white shadow-lg sticky z-50 top-0 animate-slide-down">
      <FixedCartIcon />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/home" className="navbar-logo">
            <img src={frechlogo} alt="fresh cart" className="h-10" />
          </Link>

          {/* Mobile Menu Button */}
          <button className="navbar-mobile-menu-button md:hidden" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl" />
          </button>

          {/* Navigation Links (Desktop) */}
          <div className={`navbar-links md:flex items-center space-x-8 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            {userToken && ( // Conditionally render links
              <>
                <NavLink to="/home" style={activeLinkStyle} className="navbar-link">Home</NavLink>
                <NavLink to="/products" style={activeLinkStyle} className="navbar-link">Products</NavLink>
                <NavLink to="/categories" style={activeLinkStyle} className="navbar-link">Categories</NavLink>
                <NavLink to="/brands" style={activeLinkStyle} className="navbar-link">Brands</NavLink>
              </>
            )}

            {/* Right Section (Desktop) */}
            <div className="navbar-right-section flex items-center gap-6">
              <div className="navbar-social-icons hidden md:flex items-center gap-4">
                {/* Social Icons */}
                {['facebook', 'twitter', 'youtube', 'google', 'linkedin'].map((icon) => (
                  <a key={icon} href="#" className="navbar-social-icon">
                    <i className={`fa-brands fa-${icon} text-lg`} />
                  </a>
                ))}
              </div>

              {/* Wishlist */}
              {userToken && (
                <Link to="/wishlist" className="navbar-wishlist-link">
                  <FontAwesomeIcon icon={faHeart} className="text-red-500 text-xl" />
                  <span className="navbar-wishlist-count">{wishlistItems.length}</span>
                </Link>
              )}

              {/* Auth Links */}
              <div className="navbar-auth-links flex items-center gap-4">
                {userToken ? (
                  <button onClick={handleLogout} className="navbar-logout-button">
                    <i className="fa-solid fa-arrow-right-from-bracket" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <NavLink to="/register" className="navbar-register-link">Register</NavLink>
                    <NavLink to="/login" className="navbar-login-link">Login</NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}