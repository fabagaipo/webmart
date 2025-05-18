import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Slideshow = () => {
  const slides = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% off on selected items",
      image: "https://placehold.co/1920x800?text=Sale",
      cta: "Shop Sale",
      link: "/sale"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh products just landed",
      image: "https://placehold.co/1920x800?text=New",
      cta: "View New Products",
      link: "/products/new"
    },
    {
      id: 3,
      title: "Special Promo",
      subtitle: "Limited time offer",
      image: "https://placehold.co/1920x800?text=Promo",
      cta: "Get Deal",
      link: "/promo"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px]">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ zIndex: -1 }}
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white px-4 z-10">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg sm:text-xl mb-8">
                    {slide.subtitle}
                  </p>
                  <Link 
                    to={slide.link}
                    className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 scale-90'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
