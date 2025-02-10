// wrap my appp.... token

import { createContext, useEffect, useState } from "react"




export const authContext= createContext();


// token
export default function AuthContextProvider({children}) {

const [userToken, setUserToken] = useState(null);
const [user, setUser] = useState(null);


// user - refresh => logged in?
// how to detect the user refresh?


// if condition =>

    // 3 lifecycle methods.
    useEffect(function(){
        // by default => componentDidMount
        const tkn = localStorage.getItem('tkn');
        if(tkn != null ) {
            setUserToken(tkn);
        }
    },[]);

   
    

  return (
    <authContext.Provider value={{
      setUserToken,
      userToken,
      
      user,
      
    }}>

    {children}
    
    
    </authContext.Provider>
  )
}
