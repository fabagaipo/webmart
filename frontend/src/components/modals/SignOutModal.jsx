import { BiLogOut, BiX } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

const SignOutModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className='fixed inset-0 flex items-center justify-center z-50 p-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className='fixed inset-0 bg-black/30 backdrop-blur-sm'
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.div
                        className='bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 relative z-10 overflow-hidden'
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div className='p-6'>
                            <div className='flex items-center justify-between mb-6'>
                                <div className='flex items-center space-x-3'>
                                    <div className='p-2 rounded-full bg-red-50 text-red-500'>
                                        <BiLogOut className='w-6 h-6' />
                                    </div>
                                    <h3 className='text-xl font-semibold text-gray-900'>
                                        Sign Out
                                    </h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    className='p-1.5 rounded-full no-bg no-hover no-focus'
                                    aria-label='Close modal'
                                >
                                    <BiX className='w-5 h-5' />
                                </button>
                            </div>

                            <div className='mb-6 pl-1'>
                                <p className='text-gray-600'>
                                    Are you sure you want to sign out? You'll need to log in again
                                    to access your account.
                                </p>
                            </div>

                            <div className='flex justify-end space-x-3'>
                                <button
                                    type='button'
                                    onClick={onClose}
                                    className='px-5 py-2.5 text-sm font-medium text-gray-700 no-bg no-hover no-focus'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    onClick={onConfirm}
                                    className='px-5 py-2.5 text-sm font-medium text-white !bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 flex items-center space-x-2'
                                >
                                    <BiLogOut className='w-4 h-4' />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SignOutModal;
