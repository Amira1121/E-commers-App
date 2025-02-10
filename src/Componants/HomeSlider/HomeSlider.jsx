// import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/images/slider-2.jpeg'
import img2 from '../../assets/images/slider-image-1.jpeg'
import img3 from '../../assets/images/slider-image-2.jpeg'
import img4 from '../../assets/images/slider-image-3.jpeg'
import img5 from '../../assets/images/grocery-banner-2.jpeg'
import img6 from '../../assets/images/grocery-banner.png'

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return <>

      <div className=" flex ">
        <div className=" w-3/4   ">
        <Slider {...settings} autoplay >
          <div>
            <img className=" w-full h-72" src={img1} alt="" />      
            </div>
          <div>
             <img className=" w-full h-72" src={img2} alt="" />            
             </div>
          <div>
          <img className=" w-full h-72" src={img3} alt="" />    
            </div>
          <div>
          <img className=" w-full h-72" src={img4} alt="" />           
            </div>
          <div>
          <img className=" w-full h-72" src={img5} alt="" />           
            </div>
          <div>
          <img className=" w-full h-72" src={img6} alt="" />           
          </div>
        </Slider>

        </div>
      

       <div className=" w-1/4  ">
           <img className="h-36 w-full block " src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt />
           <img className="h-36 w-full block mb-3   " src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt />
        </div>

      </div>
        
</>

}
