import { createContext, useState } from 'react';
import { WebMartApi } from 'webmart/webmartAPI';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const performSignup = (payload) => {
        return WebMartApi('user/sign-up', 'POST', payload).then((res) => {
            setUser(res.user);
            const { tokens } = res;
            localStorage.setItem('refresh_token', tokens.refresh_token);
            localStorage.setItem('access_token', tokens.access_token);
            return res;
        });
    };

    const performLogin = (payload) => {
        return WebMartApi('user/sign-in', 'POST', payload).then((res) => {
            setUser(res.user);
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

    return (
        <UserContext.Provider value={{ user, performLogin, performLogout, performSignup }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };
