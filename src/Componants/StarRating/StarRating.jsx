// StarRating.jsx
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


export const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-current" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-current" />
      ))}
    </div>
  );
};