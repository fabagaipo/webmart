import { useCallback, useEffect, useState } from 'react';
import { regions as reg, provinces as prov, cities as cit, barangays as brgy } from 'select-philippines-address';

export function usePHAddress() {
    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const getRegions = useCallback(async () => {
        reg().then((response) => setRegions(response));
    }, [])

    const getProvinces = (regionCode) => {
        prov(regionCode).then((response) => {
            setProvinces(response);
        });
    };

    const getCities = (provinceCode) => {
        cit(provinceCode).then((response) => {
            setCities(response);
        });
    };

    const getBarangays = (cityCode) => {
        brgy(cityCode).then((response) => {
            setBarangays(response);
        });
    };

    const getChildKey = (parent, _for='name') => {
        switch (parent) {
            case 'regions':
                return _for === 'name' ? 'region_name' : 'region_code';
            case 'provinces':
                return _for === 'name' ? 'province_name' : 'province_code';
            case 'cities':
                return _for === 'name' ? 'city_name' : 'city_code';
            case 'barangays':
                return _for ==='name' ? 'brgy_name' : 'brgy_code';
        }
    }

    const getSelectedData = ({ code, key }) => {
        switch (key) {
            case 'regions': {
                console.log(regions);
                const newRegion = regions.find((region) => region?.region_code === code);
                getProvinces(newRegion.region_code);
                return newRegion;
            }
            case 'provinces': {
                const newProvince = provinces.find(
                    (province) => province.province_code === code
                );
                getCities(newProvince.province_code);
                return newProvince;
            }
            case 'cities': {
                const newCity = cities.find((city) => city.city_code === code);
                getBarangays(newCity.city_code);
                return newCity;
            }
          case 'barangays': {
                const newBrgy = barangays.find(brgy => brgy.brgy_code === code);
                return newBrgy;
            }
        }
    }

    return {
        getSelectedData,
        getChildKey,
        selections: {
            regions,
            provinces,
            cities,
            barangays
        },
        getRegions
    }
}