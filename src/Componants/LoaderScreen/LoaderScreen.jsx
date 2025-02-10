import React from 'react'
import { RevolvingDot } from 'react-loader-spinner'

export default function LoaderScreen() {
  return (
    <div className=" h-screen flex justify-center items-center">
    <RevolvingDot
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="revolving-dot-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>

  )
}
