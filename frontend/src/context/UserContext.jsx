import { createContext, useCallback, useEffect, useState } from 'react';
import { WebMartApi } from 'webmart/webmartAPI';
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        const refreshAccessToken = () => {
            return WebMartApi({
                endpoint: 'user/refresh-access', method: 'GET'
            })
            .then(async (response) => {
                localStorage.setItem("access_token", response?.access_token)
                return true
            }).catch(() => {
                return false
            })
        }

        try {
            const response = await WebMartApi({
                endpoint: 'user/me', method: 'GET'
            })
            const { id, avatar_data,
                avatar_url, address, full_name, user } = response;
            setUser(prev => ({...prev, id, avatar_url, avatar_data, full_name,
                address, ...user}));
        } catch (error) {
            if (error.code === "access_token_expired") {
                const refreshed = refreshAccessToken()
                if (!refreshed) navigate('/login')
                else getUser()
            } else if (error.code === "refresh_token_expired") {
                navigate('/login')
            } else {
                console.error(error)
            }
        }
    }, [navigate]);

    const performSignup = (payload) => {
        return WebMartApi({
            endpoint: 'user/sign-up', method: 'POST', data: payload
        }).then((response) => {
            const { id, avatar_data,
                avatar_url, address, full_name, user } = response;
            setUser(prev => ({...prev, id, avatar_url, avatar_data, full_name,
                address, ...user}));
            const { tokens } = response;
            localStorage.setItem('refresh_token', tokens.refresh_token);
            localStorage.setItem('access_token', tokens.access_token);
            return response;
        });
    };

    const performLogin = (payload) => {
        return WebMartApi({
            endpoint: 'user/sign-in', method: 'POST', data: payload
        }).then((response) => {
            const { id, avatar_data,
                avatar_url, address, full_name, user } = response;
            setUser(prev => ({...prev, id, avatar_url, avatar_data, full_name,
                address, ...user}));
            const { tokens } = response;
            localStorage.setItem('refresh_token', tokens?.refresh_token);
            localStorage.setItem('access_token', tokens?.access_token);
            return response;
        });
    };

    const performLogout = (payload = {}) => {
        return WebMartApi({
            endpoint: 'user/sign-out', method:'POST', data: payload
        }).then((response) => {
            setUser({});
            localStorage.clear();
            return response;
        });
    };

    const updateUserAvatar = (payload = {}) => {
        return WebMartApi({
            endpoint: 'user/update-avatar', method: 'PUT',
            data: payload, type: 'json'
        }).then((response) => {
            return response;
        })
    }

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <UserContext.Provider value={{
                user, performLogin, performLogout, performSignup,
                updateUserAvatar
            }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };
