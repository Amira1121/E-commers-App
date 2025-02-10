// import React from 'react'
import { Link } from 'react-router-dom';

export default function Shouldres(){
  return <>
  <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
	<div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
		<h1 className="text-5xl font-bold leading-none text-center">Register now</h1>
		<p className="text-xl font-medium text-center">You must register first to access this page. Click on the button below and you will be directed to the registration page<p className="text-green-500">or if you already have an account , go to the login button.</p>  We hope you find what you are looking for.!</p>
		<div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
            <Link to='/register'>
            <button className="px-8 py-3 text-lg font-semibold rounded dark:bg-green-600 dark:text-gray-50">Get started</button>

            </Link>
            <Link to='/login'>
            <button className="px-8 py-3 text-lg font-normal border rounded dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"> LOGIN</button>

            </Link>
			
		</div>
	</div>
</section>
  
  
  </>
}
