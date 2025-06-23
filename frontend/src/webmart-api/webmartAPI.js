const BASE_URL = 'http://localhost:8000/webmart/';

export function WebMartApi(endpoint, method = 'GET', data) {
    // We use this to retain the beautiful interactive form in our api docs
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
        headers['Authorization'] = `Bearer ${access_token}`;
    }

    const config = {
        method,
        headers,
    };
    if (data) {
        const formData = new URLSearchParams();
        for (const key in data) {
            if (typeof data[key] === 'object') {
                for (const nestedKey in data[key]) {
                    formData.append(`${key}.${nestedKey}`, data[key][nestedKey]);
                }
            } else {
                formData.append(key, data[key]);
            }
        }

        config.body = formData.toString();
    }

    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}${endpoint}`, config)
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error(response);
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
}
