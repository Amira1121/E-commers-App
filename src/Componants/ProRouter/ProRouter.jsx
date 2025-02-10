// import React from 'react'
import Shouldres from '../shouldres/Shouldres';



// layer render before real component the user want to go to.

export default function ProRouter({children}) {

if (localStorage.getItem('tkn') == null) {
    return <Shouldres/>
}


  return children;
}
