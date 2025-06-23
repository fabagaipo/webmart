import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Slideshow = () => {
    const slides = [
        {
            id: 1,
            title: 'Summer Sale',
            subtitle: 'Up to 50% off on selected items',
            image: 'https://placehold.co/1920x800?text=Sale',
            cta: 'Shop Sale',
            link: '/sale',
        },
        {
            id: 2,
            title: 'New Arrivals',
            subtitle: 'Fresh products just landed',
            image: 'https://placehold.co/1920x800?text=New',
            cta: 'View New Products',
            link: '/new-arrivals',
        },
        {
            id: 3,
            title: 'Special Promo',
            subtitle: 'Limited time offer',
            image: 'https://placehold.co/1920x800?text=Promo',
            cta: 'Get Deal',
            link: '/promo',
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(
        (e) => {
            e?.preventDefault?.();
            e?.stopPropagation?.();
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        },
        [slides.length]
    );

    const prevSlide = useCallback(
        (e) => {
            e?.preventDefault?.();
            e?.stopPropagation?.();
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        },
        [slides.length]
    );

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered, slides.length]);

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <div
            className='relative w-full overflow-hidden group'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
        >
            <div className='relative w-[100vw] h-[180px] sm:h-[250px] lg:h-[320px]'>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <Link to={slide.link} className='block h-full'>
                            <div className='absolute inset-0'>
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className='w-full h-full object-cover'
                                    style={{ zIndex: -1 }}
                                />
                                <div className='absolute inset-0 bg-blue-100'></div>
                                <div className='absolute inset-0 flex items-center justify-center text-gray-900 px-4 z-10 cursor-pointer'>
                                    <div className='text-center'>
                                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
                                            {slide.title}
                                        </h2>
                                        <p className='text-lg sm:text-xl mb-8'>{slide.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 hover:text-gray-400 w-16 h-16 flex items-center justify-center z-50 no-bg no-focus'
                    aria-label='Previous slide'
                    style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                >
                    <IoIosArrowBack className='h-14 w-14' />
                </button>
                <button
                    onClick={nextSlide}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 hover:text-gray-400 w-16 h-16 flex items-center justify-center z-50 no-bg no-focus'
                    aria-label='Next slide'
                    style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                >
                    <IoIosArrowForward className='h-14 w-14' />
                </button>
            </div>
        </div>
    );
};

export default Slideshow;
