import { createContext, useCallback, useEffect, useState } from 'react';
import { WebMartApi } from 'webmart/webmartAPI';
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        const refreshAccessToken = () => {
            return WebMartApi('user/refresh-access', 'GET')
            .then(async (res) => {
                localStorage.setItem("access_token", res?.access_token)
                return true
            }).catch(() => {
                return false
            })
        }

        try {
            const response = await WebMartApi('user/me', 'GET')
            const { id, avatar_url, address, user } = response.data;
            setUser(prev => ({...prev, id, avatar_url, address, ...user}));
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
        return WebMartApi('user/sign-up', 'POST', payload).then((res) => {
            const { id, avatar_url, address, user } = res.data;
            setUser(prev => ({...prev, id, avatar_url, address, ...user}));
            const { tokens } = res;
            localStorage.setItem('refresh_token', tokens.refresh_token);
            localStorage.setItem('access_token', tokens.access_token);
            return res;
        });
    };

    const performLogin = (payload) => {
        return WebMartApi('user/sign-in', 'POST', payload).then((res) => {
            const { id, avatar_url, address, user } = res.data;
            setUser(prev => ({...prev, id, avatar_url, address, ...user}));
            const { tokens } = res;
            localStorage.setItem('refresh_token', tokens?.refresh_token);
            localStorage.setItem('access_token', tokens?.access_token);
            return res;
        });
    };

    const performLogout = (payload = {}) => {
        return WebMartApi('user/sign-out', 'POST', payload).then((res) => {
            setUser({});
            localStorage.clear();
            return res;
        });
    };

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <UserContext.Provider value={{ user, performLogin, performLogout, performSignup }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };
