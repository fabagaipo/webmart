import React, { useState, useRef, useEffect, useCallback } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
    regions,
    provinces,
    cities,
    barangays,
} from 'select-philippines-address';
import { useUser } from 'context';
import { useLocation, useNavigate } from "react-router";

const AuthForm = ({ mode }) => {
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
  const location = useLocation();

  const [addressOptions, setAddressOptions] = useState({
    regions: [],
    provinces: [],
    cities: [],
    barangays: []
  });
  const [address, setAddress] = useState({
    region: {},
    province: {},
    city: {},
    barangay: {},
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
        ...address
      }
      performSignup(payload).then(() => {
        //navigate("/cart")
      });
    }
    else {
      const payload = {
        email: email,
        password: password,
        username: ''
      }
      performLogin(payload).then(() => {
        navigate('/profile')
      }).catch(() => {})
    }
  }

  const getRegions = useCallback(() => {
    regions().then(res => setAddressOptions((prev) => ({...prev, regions: res})));
  }, [])

  const getProvinces = (regionCode) => {
    provinces(regionCode).then((res) => {
      setAddressOptions((prev) => ({...prev, provinces: res, cities: [], barangays: []}));
    })
  }

  const getCities = (provinceCode) => {
    cities(provinceCode).then((res) => {
      setAddressOptions((prev) => ({...prev, cities: res, barangays: []}));
    })
  }

  const getBarangays = (cityCode) => {
    barangays(cityCode).then((res) => {
      setAddressOptions((prev) => ({...prev, barangays: res}));
    })
  }

  const onSelection = ({code, key}) => {
    switch(key) {
      case 'regions':
        { 
          //resetOptions(['provinces', 'cities', 'barangays']);
          const newRegion = addressOptions[key].find(region => region.region_code === code);
          setAddress((prev) => ({...prev,
            region: newRegion
          }));
          getProvinces(newRegion.region_code);
          break; 
        }
      case 'provinces':
        { 
          //resetOptions(['cities', 'barangays']);
          const newProvince = addressOptions[key].find(province => province.province_code === code);
          setAddress((prev) => ({...prev,
            province: newProvince
          }));
          getCities(newProvince.province_code);
          break; 
        }
      case 'cities':
        {
          const newCity = addressOptions[key].find(city => city.city_code === code);
          setAddress((prev) => ({...prev,
            city: newCity
          }));
          getBarangays(newCity.city_code);
          break;
        }
    }
  }

  const resetOptions = (keys) => {
    keys.forEach(key=> {
      setAddressOptions((prev) => ({...prev, [key]: []}));
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passwordContainerRef.current && !passwordContainerRef.current.contains(event.target)) {
        setShowPassword(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getRegions();
  }, [getRegions])

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="relative mb-2 w-20 h-20">
          <div className="absolute inset-0 bg-gray-200 rounded-full aspect-square"></div>
          <img src="./user.svg" alt="User" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
        </div>
        <p className="text-gray-600 text-lg mb-1">{ mode === 'login' ? 'Sign in to' : 'Create' } your account</p>
      </div>
      <h2 className="text-3xl font-bold mb-2 text-center">
        {mode === 'login' ? 'Login' : 'Register'}
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        {mode === 'register' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full rounded-md shadow-sm text-gray-900 p-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 p-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number (Optional)
              </label>
              <PhoneInput
                id="phone"
                value={phone}
                onChange={setPhone}
                defaultCountry="PH"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 p-2 focus:outline-none"
                placeholder="Enter phone number"
                style={{
                  input: {
                    padding: '8px'
                  }
                }}
              />
            </div>
            {
              ['regions', 'provinces', 'cities', 'barangays'].map((key) => {
                const texts = {
                  regions: 'Region',
                  provinces: 'Province',
                  cities: 'City',
                  barangays: 'Barangay'
                }
                const vals = {
                  regions: address['region'],
                  provinces: address['province'],
                  cities: address['city'],
                  barangays: address['barangay']
                }
                return (
                  <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                      {texts[key]}
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 pr-10 appearance-none p-2 focus:outline-none"
                      value={vals[key]?.psgc_code}
                      defaultValue={'preselect'}
                      required
                      onChange={(e) => onSelection({ code: e.target.value, key})}
                    >
                      <option disabled value={'preselect'}>{`Select ${texts[key].toLowerCase()}`}</option>
                      {addressOptions[key].map((data) => {
                        const innerKey = {
                        regions: data?.region_code,
                        provinces: data?.province_code,
                        cities: data?.city_code,
                        barangays: data?.brgy_code
                        }
                        const name = data?.region_name ?? data?.province_name
                          ?? data?.city_name ?? data?.brgy_name;
                        return (
                          <option key={innerKey[key]} value={innerKey[key]}>
                            {name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                );
              })
            }
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 p-2
            focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative" ref={passwordContainerRef}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 p-2
              focus:outline-none"
              required
            />
            <button 
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 no-bg no-hover no-focus"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {mode === 'login' 
          ? "Don't have an account? "
          : "Already have an account? "
        }
        <a href={mode === 'login' ? '/register' : '/login'} className="font-medium text-indigo-600 hover:text-indigo-500">
          {mode === 'login' ? 'Register' : 'Login'}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;