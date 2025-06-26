import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const footerSections = [
        {
            title: 'Customer Service',
            links: [
                { text: 'Track Order', url: '/track-order' },
                { text: 'Returns & Refunds', url: '/returns' },
                { text: 'Contact Us', url: '/contact' },
            ],
        },
        {
            title: 'About WebMart',
            links: [
                { text: 'About Us', url: '/about' },
                { text: 'Sell on WebMart', url: '/sell' },
                { text: 'Careers', url: '/career' },
            ],
        },
        {
            title: 'Ways to Pay',
            links: [
                { text: 'Credit Cards', url: '/credit-cards' },
                { text: 'Installment', url: '/installment' },
                { text: 'Payment Methods', url: '/payment-methods' },
            ],
        },
        {
            title: 'Follow Us',
            links: [
                { text: 'Facebook', url: 'https://www.facebook.com/', icon: <FaFacebook className="inline mr-2" /> },
                { text: 'Instagram', url: 'https://www.instagram.com/', icon: <FaInstagram className="inline mr-2" /> },
                { text: 'Twitter', url: 'https://twitter.com/', icon: <FaTwitter className="inline mr-2" /> },
            ],
        },
    ];

    return (
        <footer className='bg-gray-100 text-gray-700 py-12 mt-auto'>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {footerSections.map((section, index) => (
                        <div key={index} className='mb-8 md:mb-0'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                                {section.title}
                            </h3>
                            <ul className='space-y-2'>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            to={link.url}
                                            className='text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center'
                                            target={link.url.startsWith('http') ? '_blank' : undefined}
                                            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                            {link.icon || null}
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className='border-t border-gray-200 mt-12 pt-8'>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div className='mb-4 md:mb-0'>
                            <p className='text-sm text-gray-500'>
                                2025 WebMart. All rights reserved.
                            </p>
                        </div>
                        <div className='flex space-x-6'>
                            <Link
                                to='/privacy'
                                className='text-sm text-gray-600 hover:text-blue-600'
                            >
                                Privacy Policy
                            </Link>
                            <Link to='/terms' className='text-sm text-gray-600 hover:text-blue-600'>
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
