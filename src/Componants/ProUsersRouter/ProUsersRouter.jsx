// import React from 'react'

import NeverReturn from "../NeverReturn/NeverReturn";

export default function ProUsersRouter({children}) {

if (localStorage.getItem('tkn') != null) {
    return <NeverReturn/>
}



  return children;
}
