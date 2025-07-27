import { TfiLocationPin } from "react-icons/tfi";
import { PiPencilSimpleLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { usePHAddress } from 'custom-hooks/usePHAddress';
import { useUserContext } from 'contexts';


// WIP
export function Address({ address, addressToEdit, onEdit }) {
    const { user } = useUserContext();
    const { getSelectedData, getChildKey, selections } = usePHAddress();
    const [addressForm, setAddressForm] = useState(null);

    return (
        <> 
        {
            !addressToEdit ? (
                <div className="container bg-gray rounded-lg border border-gray-100 flex items-center">
                    <TfiLocationPin className='h-5 w-30 text-gray-600' />
                    <div className="container flex flex-col p-2">
                        <div className="flex flex-col">
                            <p className='flex text-sm font-medium text-gray-500'>
                                Address
                            </p>
                            <p className='mt-1 text-sm text-gray-900'>
                                Poblacion, Toledo City, Cebu, Region VII
                            </p>
                        </div>
                        <div className="flex flex-col mt-1 ">
                            <p className='text-sm mt-1 font-medium text-gray-500'>
                                Phone
                            </p>
                            <p className='mt-1 text-sm text-gray-900'>
                                09666666666
                            </p>
                        </div>
                    </div>
                    <div className="w-35 flex flex-col items-center">
                        <div
                            onClick={() => onEdit(address)}
                            className='flex items-center p-2 rounded-full cursor-pointer hover:bg-gray-100'
                        >
                            <PiPencilSimpleLight className='w-auto h-5 text-gray-600' />
                        </div>
                    </div>
                </div>
            ) :
                <div
                    className="mt-6 w-full flex flex-col"
                >
                    <form
                        className="flex flex-col gap-4"
                    >
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
                                        className='mt-2 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 pr-10 appearance-none p-2 focus:outline-none'
                                        defaultValue=''
                                        required
                                        onChange={(e) => {
                                            const choice = getSelectedData({ code: e.target.value, key });
                                            setAddressForm(prev => ({...prev, [key]: choice}))
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
                    </form>
                    <div
                        onClick={() => onEdit(address)}
                        className='flex items-center p-2 rounded-full cursor-pointer hover:bg-gray-100'
                    >
                        <PiPencilSimpleLight className='w-auto h-5 text-gray-600' />
                    </div>
                </div>
        }
        </>
    )
}