import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoCollage = () => {
  const navigate = useNavigate();
  
  const promoItems = [
    {
      id: 1,
      title: 'Summer Sale',
      subtitle: 'Up to 70% Off',
      image: 'https://placehold.co/600x400/FF6B6B/FFFFFF?text=Summer+Sale',
      className: 'row-span-2 col-span-2',
      textColor: 'text-white',
      url: '/summer-sale',
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Shop Now',
      image: 'https://placehold.co/600x300/4ECDC4/FFFFFF?text=New+Arrivals',
      className: 'col-span-1',
      textColor: 'text-gray-900',
      url: '/new-arrivals',
    },
    {
      id: 3,
      title: 'Limited Time',
      subtitle: 'Special Offers',
      image: 'https://placehold.co/600x300/45B7D1/FFFFFF?text=Special+Offers',
      className: 'col-span-1',
      textColor: 'text-white',
      url: '/special-offers',
    },
    {
      id: 4,
      title: 'Best Sellers',
      subtitle: 'Trending Now',
      image: 'https://placehold.co/600x300/96CEB4/FFFFFF?text=Best+Sellers',
      className: 'col-span-2',
      textColor: 'text-gray-900',
      url: '/best-sellers',
    },
  ];

  const handlePromoClick = (url) => {
    navigate(url);
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
        {promoItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => handlePromoClick(item.url)}
            className={`relative rounded-xl overflow-hidden group ${item.className} h-full cursor-pointer`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handlePromoClick(item.url)}
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <h3 className={`text-2xl font-bold ${item.textColor} mb-1`}>{item.title}</h3>
              <p className={`text-lg ${item.textColor} opacity-90`}>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoCollage;
