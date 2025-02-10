import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";



// https://ecommerce.routemisr.com/api/v1/categories




export default function CategoriesSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
      };


//    const [AllCategories, setAllCategories] = useState(null)   


// async function getAllCategories(){
//     axios.get('https://ecommerce.routemisr.com/api/v1/categories')
//     .then( function(res){
//         console.log(res.data.data) ;  
//         setAllCategories(res.data.data);
//     })
//     .catsh( function(erro){
//         console.log(erro);
//     })
// }


// useEffect(() => {
// //   
// getAllCategories();

// }, [])



//      


function gerAllCategories(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
 }

const{data, isError, isLoading, isFetching} = useQuery({

queryKey:['gerAllCategories'],
queryFn:gerAllCategories,

})

const allCatogry = data?.data.data

if (isLoading){
return  <LoaderScreen/>
}


return<>




<Slider {...settings} autoplay >
         {allCatogry?.map(category => <div key={category._id}>
             <img className=" w-full h-72" src={category.image} alt="" />
             <h6>{category.name}</h6>      
             </div>)}
          {/* <div>
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
          </div> */}
        </Slider>

</>
}
