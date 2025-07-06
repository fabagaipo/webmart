import axios from "axios";

function prepRequestBody(data, type='form') {
    if (type === 'form') {
        let form = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === 'id') return;
            form.append(key, data[key]);
        })
        return form;
    } else if (type === 'json') {
        return JSON.stringify(data);
    } else {
        return data;
    }
}

export async function WebMartApi({endpoint, method='POST', type='json', data=null}) {
    if (method === 'GET') type = 'json';
    const BASE_URL = import.meta.env.VITE_WEBMART_BASE_URL;
    const access_token = localStorage.getItem('access_token');

    // https://axios-http.com/docs/instance
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            ...(access_token ? {Authorization: `Bearer ${access_token}`} : {}),
            ...(type === 'json' ? {'Content-Type' :'application/json'} : {})
        }
    });

    try {
        const response = await instance.request({
            data: prepRequestBody(data, type),
            method: method.toLocaleLowerCase(),
            url: endpoint
        })
        return response.data;
    } catch (error) {
        // https://axios-http.com/docs/handling_errors
        return error.response.data;
    }
}
