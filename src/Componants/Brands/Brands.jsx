import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import Page404 from '../NotFound/Page404';
import '../Brands/Brands.css';

export default function Brands() {
  const { 
    data, 
    isError, 
    error, 
    isLoading, 
    isFetched 
  } = useQuery({
    queryKey: ['allBrands'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/brands'),
    staleTime: 600000
  });

  const allBrands = data?.data?.data;

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (isError) {
    return <Page404/>;
  }

  return (
    <div className="container mx-auto p-5 animate-fade-in">
      <h1 className="text-center text-lime-600 text-4xl p-5 mb-8 font-bold animate-slide-down">
        All Brands
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {allBrands?.map((brand, index) => (
          <div 
            key={brand._id}
            className="brand-card animate-pop-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="image-container">
              <img 
                src={brand.image} 
                alt={brand.name}
                loading="lazy"
              />
            </div>
            <h2 className="brand-title">{brand.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}