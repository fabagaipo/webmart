import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-white py-20'>
            <div className='text-center px-4 w-full max-w-md'>
                <h1 className='text-9xl font-bold text-gray-900 mb-6'>404</h1>
                <h2 className='text-4xl font-semibold text-gray-900 mb-6'>Page Not Found</h2>
                <p className='text-xl text-gray-600 mb-10'>
                    The page you're looking for doesn't exist.
                </p>
                <Link
                    to='/'
                    className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none'
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
