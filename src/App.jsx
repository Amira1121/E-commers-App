// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Componants/Layout/Layout'
import Register from './Componants/Register/Register'
import Login from './Componants/Login/Login';
import Page404 from './Componants/NotFound/Page404';
import AuthContextProvider from './context/AuthContext';
import Home from './Componants/Home/Home';
import Products from './Componants/Prouducts/Products';
import Categories from './Componants/Categories/Categories';
import Brands from './Componants/Brands/Brands';
import ProRouter from './Componants/ProRouter/ProRouter';
import ProUsersRouter from './Componants/ProUsersRouter/ProUsersRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './Componants/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import CartPage from './Componants/CartPage/CartPage';
import Payment from './Componants/Payment/Payment';
import Forgetpassword from './Componants/ForgetThePassword/Forgetpassword';
import { Offline } from 'react-detect-offline';
import WishlistPage from './Componants/Wishlist/Wishlist';
import { WishlistProvider } from './context/WishlistContext';
import ResetPassword from './Componants/ResetPassword/ResetPassword';
import ResetCode from './Componants/ResetCode/ResetCode';
import OrdersPage from './Componants/AllOrdersPage/OrdersPage';
import { OrdersProvider } from "./context/OrdersContext";





const router= createBrowserRouter([
  {path: '', element:<Layout/>,children:[
    {index: true, element:<ProRouter> <Home/></ProRouter>},
    {path:'home', element:<ProRouter> <Home/></ProRouter>},
    {path:'register', element:<ProUsersRouter><Register/></ProUsersRouter> },
    {path:'forgetpassword', element:<ProUsersRouter><Forgetpassword/></ProUsersRouter> },
    {path:'resetpassword', element:<ProUsersRouter><ResetPassword/></ProUsersRouter> },
    {path:'resetcode', element:<ProUsersRouter><ResetCode/></ProUsersRouter> },
    {path:'login', element:<ProUsersRouter> <Login/></ProUsersRouter> },
    {path:'products', element:<ProRouter><Products/></ProRouter>},
    {path:'wishlist', element:<ProRouter><WishlistPage/></ProRouter>},
    {path:'categories', element:<ProRouter><Categories/></ProRouter>},
    {path:'brands', element:<ProRouter><Brands/></ProRouter>},
    {path:'cart', element:<ProRouter><CartPage/></ProRouter>},
    {path:'allorders', element:<ProRouter><OrdersPage/></ProRouter>},
    {path:'payment', element:<ProRouter><Payment/> </ProRouter>},
    {path:'productDetails/:id', element:<ProRouter><ProductDetails/></ProRouter>},
    {path:'*', element:<Page404/>},
  ]}
]);


const client = new QueryClient({

});

function App() {
  
  return <>
  
  
  <QueryClientProvider client={client}>
  
{/* context component to wrap my app */}
<AuthContextProvider>

<WishlistProvider>
<OrdersProvider>
<CartContextProvider>

<RouterProvider router={router}/>


</CartContextProvider>

</OrdersProvider>
</WishlistProvider>

</AuthContextProvider>
<Toaster/>

</QueryClientProvider>


<Offline>
<div className="offline-container">
      <div className="offline-message">
        <p>You are currently offline.</p>
        <p>Please check your internet connection.</p>
      </div>
    </div>
 </Offline>
  
  
  </>


   

    
  
   

}

export default App
