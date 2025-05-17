import React from 'react';

const Banners = () => {
  const banners = [
    {
      title: "Vouchers Available",
      description: "Get 10% off on your first purchase",
      icon: "⚡",
      bg: "bg-gradient-to-r from-yellow-500 to-yellow-600"
    },
    {
      title: "Coupons Inside",
      description: "Use code WEBMART20 for 20% off",
      icon: "🏷️",
      bg: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Rewards Program",
      description: "Earn points with every purchase",
      icon: "⭐",
      bg: "bg-gradient-to-r from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {banners.map((banner, index) => (
        <div 
          key={index}
          className={`relative rounded-lg overflow-hidden ${banner.bg} text-white p-6 transition-transform hover:scale-[1.02]`}
        >
          <div className="absolute top-4 left-4 text-4xl opacity-70">{banner.icon}</div>
          <div className="pl-10">
            <h3 className="text-xl font-semibold mb-2">{banner.title}</h3>
            <p className="text-sm">{banner.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banners;
