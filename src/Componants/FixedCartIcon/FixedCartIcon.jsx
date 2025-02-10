import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../FixedCartIcon/FixedCardIcon.css';
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';


const FixedCartIcon = () => {
  const { userToken } = useContext(authContext);
  const{numOfCartItems,totalCartPrice}= useContext(cartContext);
  const navigate = useNavigate();
  const handleCartClick = () => {
    // Add your cart click logic here
    navigate('/cart');
  };


  return <>

  

   {userToken && <div className="fixed-cart-container">
      <div className="price-badge">
        <span className="original-price">Total</span>
        <span className="discounted-price">${totalCartPrice}</span>
      </div>
      <div className="pro-badge">{numOfCartItems}</div>
      <div className="fixed-cart-icon" onClick={handleCartClick}>
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
      </div>
    </div>
  }
  
  </>
   
  
};

export default FixedCartIcon;