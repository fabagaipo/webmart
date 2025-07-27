import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdStarRate, MdStarOutline, MdStarHalf } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useProductsContext } from 'contexts'

function Products() {
    const { getProducts } = useProductsContext()
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);
        getProducts()
            .then(({ products }) => {
                products.forEach(product => {
                    product.sales = Math.floor(Math.random() * 9999)
                    product.rating = ((Math.random() * 5) + 1).toFixed(2)
                })
                setProducts(products)
            }).catch((err) => 
                console.error(err)
            )
    }, []);

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-4xl font-extrabold mb-8 text-center'
                >
                    <span className='relative inline-block'>
                        <span className='bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text'>
                            All Products
                        </span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                            className='absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full origin-left'
                        />
                    </span>
                </motion.h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {products.length && products.map((product) => (
                        <div
                            key={product.id}
                            className='group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100'
                        >
                            <Link to={`/product/${product.id}`} className='flex flex-col h-full'>
                                <div className='relative pt-[100%] overflow-hidden'>
                                    <img
                                        src={product.image_data?.url}
                                        alt={product.name}
                                        className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                </div>
                                <div className='p-4 flex-1 flex flex-col'>
                                    <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
                                        {product.name}
                                    </h3>
                                    <div className='flex items-center mb-3'>
                                        <div className='flex'>
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                if (star <= Math.floor(product.rating)) {
                                                    return (
                                                        <MdStarRate
                                                            key={star}
                                                            className='w-5 h-5 text-yellow-400'
                                                        />
                                                    );
                                                }
                                                if (
                                                    star === Math.ceil(product.rating) &&
                                                    product.rating % 1 > 0
                                                ) {
                                                    return (
                                                        <MdStarHalf
                                                            key={star}
                                                            className='w-5 h-5 text-yellow-400'
                                                        />
                                                    );
                                                }
                                                return (
                                                    <MdStarOutline
                                                        key={star}
                                                        className='w-5 h-5 text-yellow-400'
                                                    />
                                                );
                                            })}
                                        </div>
                                        {/*<span className='ml-2 text-sm text-gray-500'>
                                            ({product.rating})
                                        </span>*/}
                                    </div>
                                    <div className='mt-auto pt-3 border-t border-gray-100'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-xl font-bold text-blue-900'>
                                                ₱{product.price}
                                            </span>
                                            <div className='text-xs text-gray-500 mt-1'>
                                                {product.sales || 0} sold
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
