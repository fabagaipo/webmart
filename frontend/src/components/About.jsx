import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaBullseye, FaHandsHelping, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

function About() {

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-4xl font-extrabold mb-6 text-center'
                >
                    <span className='relative inline-block'>
                        <span className='bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text'>
                            About WebMart
                        </span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                            className='absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full origin-left'
                        />
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className='text-gray-600 max-w-2xl mx-auto mb-8 text-lg'
                >
                    Redefining the future of e-commerce with innovation and customer satisfaction at our core.
                </motion.p>

                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24'
                >
                    {/* Company Info */}
                    <motion.div variants={fadeInUp} className='bg-white p-8 rounded-2xl shadow-lg'>
                        <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Story</h2>
                        <p className='text-gray-600 mb-8 text-lg leading-relaxed'>
                            Founded in 2025, WebMart was born from a simple idea: to create a website for a personal project so the developers of this website
                            can have better jobs
                        </p>
                        
                        <div className='space-y-6'>
                            {[
                                {
                                    icon: <FaTrophy className='w-6 h-6' />,
                                    title: "Mission",
                                    description: "To provide our customers with the best shopping experience possible through quality products and exceptional service."
                                },
                                {
                                    icon: <FaBullseye className='w-6 h-6' />,
                                    title: "Vision",
                                    description: "To be the most customer-centric e-commerce platform, setting new standards in online shopping."
                                },
                                {
                                    icon: <FaHandsHelping className='w-6 h-6' />,
                                    title: "Values",
                                    description: "Customer satisfaction, innovation, integrity, and community impact drive everything we do."
                                }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className='flex items-start p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all'
                                >
                                    <div className='p-3 rounded-full bg-primary-100 text-primary-600 mr-4'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-lg text-gray-900'>{item.title}</h3>
                                        <p className='text-gray-600 mt-1'>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={fadeInUp} className='bg-white p-8 rounded-2xl shadow-lg'>
                        <h2 className='text-3xl font-bold text-gray-900 mb-8'>Get In Touch</h2>
                        <div className='space-y-6'>
                            {[
                                {
                                    icon: <FaMapMarkerAlt className='w-6 h-6' />,
                                    title: "Our Location",
                                    content: "123 Shopping Street, Metro Manila, Philippines",
                                    link: "#"
                                },
                                {
                                    icon: <FaPhoneAlt className='w-5 h-5' />,
                                    title: "Phone",
                                    content: "(032) 123-4567",
                                    link: "tel:+63321234567"
                                },
                                {
                                    icon: <FaEnvelope className='w-5 h-5' />,
                                    title: "Email",
                                    content: "support@webmart.com",
                                    link: "mailto:support@webmart.com"
                                },
                                {
                                    icon: <FaClock className='w-5 h-5' />,
                                    title: "Working Hours",
                                    content: "24/7 Customer Support",
                                    link: "#"
                                }
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.link}
                                    whileHover={{ x: 5 }}
                                    className='flex items-start group'
                                >
                                    <div className='p-3 rounded-full bg-gray-100 text-primary-600 mr-4 group-hover:bg-primary-100 transition-colors'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className='font-medium text-gray-500 text-sm'>{item.title}</h3>
                                        <p className='text-gray-900 font-medium mt-1'>{item.content}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className='mt-12 bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-xl'>
                            <h3 className='text-xl font-semibold text-gray-900 mb-3'>Join Our Newsletter</h3>
                            <p className='text-gray-600 mb-4'>Stay updated with our latest offers and news</p>
                            <div className='flex'>
                                <input 
                                    type="email" 
                                    placeholder='Enter your email' 
                                    className='flex-1 px-4 py-2 rounded-l-lg border border-r-0 border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none'
                                />
                                <button className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-r-lg transition-colors'>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default About;
