import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import '../Categories/Categories.css';

export default function Categories() {
  const { 
    data, 
    isError, 
    isLoading, 
    isFetching,
    error 
  } = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
    staleTime: 600000
  });

  const allCategories = data?.data?.data;

  if (isLoading || isFetching) {
    return <LoaderScreen />;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-600 font-medium">
        Error loading categories: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Filter Buttons Section */}
      <div className="sticky top-0 bg-white z-10 py-4 shadow-sm">
        <div className="flex flex-wrap justify-center gap-3 px-2">
          <button className="filter-btn animate-fade-in">
            All categories
          </button>
          {['Music', 'Fashion', 'Electronics', 'Books', 'Beauty', 'Toys'].map((category) => (
            <button 
              key={category}
              className="filter-btn animate-fade-in"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {allCategories?.map((category) => (
          <div 
            key={category._id}
            className="category-card animate-slide-up"
          >
            <div className="image-container">
              <img 
                src={category.image} 
                alt={category.name}
                className="category-image"
                loading="lazy"
              />
            </div>
            <h3 className="category-title">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}