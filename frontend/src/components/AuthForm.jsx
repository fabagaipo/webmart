import { useState, useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from 'context';
import { usePHAddress } from 'custom-hooks/usePHAddress';
import { useNavigate } from 'react-router';

const AuthForm = ({ mode }) => {
    const { getSelectedData, getChildKey, selections } = usePHAddress();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordContainerRef = useRef(null);
    const { user, performLogin, performSignup } = useUser();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        regions: {},
        provinces: {},
        cities: {},
        barangays: {},
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "register") {
            const payload = {
                email: email,
                first_name: firstName,
                last_name: lastName,
                password: password,
                address: {
                    region_code: address['regions'].region_code,
                    province_code: address['provinces'].province_code,
                    city_code: address['cities'].city_code,
                    barangay_code: address['barangays'].brgy_code,
                    phone_number: phone
                }
            }
            performSignup(payload).then(() => {
                navigate('/profile');
            }).catch((e) => {
                setError(e.message);
            });
        } else {
            const payload = {
                email: email,
                password: password,
                username: ''
            }
            performLogin(payload).then(() => {
                navigate('/profile');
            }).catch(() => {})
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                passwordContainerRef.current &&
                !passwordContainerRef.current.contains(event.target)
            ) {
                setShowPassword(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (user?.id) navigate('/profile')
    }, [user, navigate])

    return (
        <div
            className='max-w-md mx-auto bg-white rounded-lg shadow p-8'
            onClick={() => setError('')}
        >
            <div className='flex flex-col items-center justify-center mb-2'>
                <div className='relative mb-2 w-20 h-20'>
                    <div className='absolute inset-0 bg-gray-200 rounded-full aspect-square'></div>
                    <img
                        src='./user.svg'
                        alt='User'
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12'
                    />
                </div>
                <p className='text-gray-600 text-lg mb-1'>
                    {mode === 'login' ? 'Sign in to' : 'Create'} your account
                </p>
            </div>
            <h2 className='text-3xl font-bold mb-2 text-center'>
                {mode === 'login' ? 'Login' : 'Register'}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-8'>
                {mode === 'register' && (
                    <div className='space-y-4'>
                        <div>
                            <label
                                htmlFor='firstName'
                                className='block text-sm font-medium text-gray-700'
                            >
                                First Name
                            </label>
                            <input
                                type='text'
                                id='firstName'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='mt-1 block w-full rounded-md shadow-sm text-gray-900 p-2 focus:outline-none'
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='lastName'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Last Name
                            </label>
                            <input
                                type='text'
                                id='lastName'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 p-2 focus:outline-none'
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='phone'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Phone Number (Optional)
                            </label>
                            <PhoneInput
                                id='phone'
                                value={phone}
                                onChange={setPhone}
                                defaultCountry='PH'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 p-2 focus:outline-none'
                                placeholder='Enter phone number'
                                style={{
                                    input: {
                                        padding: '8px',
                                    },
                                }}
                            />
                        </div>
                        {['regions', 'provinces', 'cities', 'barangays'].map((key) => {
                            const texts = {
                                regions: 'Region',
                                provinces: 'Province',
                                cities: 'City',
                                barangays: 'Barangay',
                            };
                            return (
                                !!selections[key].length &&
                                <div
                                    key={key}
                                >
                                    <label
                                        htmlFor={key}
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        {texts[key]}
                                    </label>
                                    <select
                                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 appearance-none p-2 focus:outline-none'
                                        defaultValue=''
                                        required={!Object.keys(address[key]).length}
                                        onChange={(e) => {
                                            const choice = getSelectedData({ code: e.target.value, key });
                                            setAddress(prev => ({...prev, [key]: choice}))
                                        }}
                                    >
                                        <option
                                            disabled
                                            value=''
                                        >
                                            {`Select a ${texts[key].toLowerCase()}`}
                                        </option>
                                        {selections[key].map((data) =>{
                                            const code = data[getChildKey(key, 'code')];
                                            const name = data[getChildKey(key)];
                                            return (
                                                <option
                                                    key={code}
                                                    value={code}
                                                >
                                                    {name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 p-2
            focus:outline-none'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                        Password
                    </label>
                    <div className='relative' ref={passwordContainerRef}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 p-2
              focus:outline-none'
                            required
                        />
                        <button
                            type='button'
                            onClick={togglePasswordVisibility}
                            className='absolute right-2 top-1/2 -translate-y-1/2 text-[#001E60] no-bg no-hover no-focus'
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                </div>
                <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white'
                >
                    {mode === 'login' ? 'Login' : 'Register'}
                </button>
            </form>
            {error && (
                <p className='mt-2 text-red-700'>
                    { error }
                </p >
            )}
            <p className='mt-4 text-center text-sm text-gray-600'>
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <a
                    href={mode === 'login' ? '/register' : '/login'}
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                    {mode === 'login' ? 'Register' : 'Login'}
                </a>
            </p>
        </div>
    );
};

export default AuthForm;
