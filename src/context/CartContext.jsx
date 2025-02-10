// import React from 'react'

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { authContext } from "./AuthContext";



 export const cartContext  =createContext();

// control our provider => store 
export default function CartContextProvider({children}) {
    const {userToken} = useContext(authContext);
    const [numOfCartItems, setNumOfCartItem] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [products, setProducts] = useState(null);
    const [cartId, setCartId] = useState(null)




    function resetValues(){
      setNumOfCartItem(0)
      setTotalCartPrice(0)
      setProducts(null)
      setCartId(null)
    }

     
    async function addProductToCart(productId){
       // tanstack query =>
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            "productId": productId,
        },
        {
            headers : { 
               token:userToken 
            },
            // headers : { token:localStorage.getItem('tkn') },
        })
     .then(function(res){
      //   console.log(res.data);
      setCartId(res.data.cartId)

      //   setNumOfCartItem(res.data.numOfCartItem)
      //   setTotalCartPrice(res.data.data.totalCartPrice)
      //   setProducts(res.data.data.products);
      getUserCart();


        return true;


        // display message to the user with success

     })
     .catch(function(erro){
        console.log(erro);


        return false;

        // display message to the user with error


     }) 
     return res;  

    }


    function getUserCart(){
      axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
         headers:{
            token : userToken
         },
      })
      .then(function(res){
         console.log(res.data);
 
         setNumOfCartItem(res.data.numOfCartItems)
         setTotalCartPrice(res.data.data.totalCartPrice)
         setProducts(res.data.data.products);
         setCartId(res.data.cartId)


 
 
 
         // display message to the user with success
 
      })
      .catch(function(erro){
         console.log(erro);
 
 
 
         // display message to the user with error
 
 
      }) 
      

    }



    function updateCount(id,newCount) {
      axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,

         {
            "count": newCount
        },
        {
         headers:{
            token:userToken,
         }
        }
      )
      .then(function(resp){
         console.log(resp.data);
 
         setNumOfCartItem(resp.data.numOfCartItems)
         setTotalCartPrice(resp.data.data.totalCartPrice)
         setProducts(resp.data.data.products);

 
 
 
         // display message to the user with success
 
      })
      .catch(function(erro){
         console.log(erro);
 
 
 
         // display message to the user with error
 
 
      }) 
      
    }

   async function removeElement(id){
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
         {
            headers: {
               token : userToken,
            }
         }
      )
      .then(function(resp){
         console.log(resp.data);
 
         setNumOfCartItem(resp.data.numOfCartItems)
         setTotalCartPrice(resp.data.data.totalCartPrice)
         setProducts(resp.data.data.products);

        return true;
 
 
         // display message to the user with success
 
      })
      .catch(function(erro){
         console.log(erro);
 
 
       return false
         // display message to the user with error
 
 
      }) ;
      return res;
    }
   async function clearCart(){
      const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', 
         {
            headers: {
               token : userToken,
            }
         }
      )
      .then(function(resp){
         console.log(resp.data);
 
         setNumOfCartItem(0)
         setTotalCartPrice(0)
         setProducts(null);

        return true;
 
 
         // display message to the user with success
 
      })
      .catch(function(erro){
         console.log(erro);
 
 
       return false
         // display message to the user with error
 
 
      }) ;
      return res;
    }







// component didmount
useEffect(()=> {
   // on every refresh for first time .
  
      if(userToken){
         getUserCart();
      }
   // login => 
   
},[userToken]);



  return <>
  

  <cartContext.Provider value={{
        addProductToCart,
        getUserCart,
        numOfCartItems,
        totalCartPrice,
        products,
        updateCount,
        removeElement,
        clearCart,
        cartId,
        resetValues,
    }}>
       {children}
  </cartContext.Provider>
  
  
  
  
  </>
}
