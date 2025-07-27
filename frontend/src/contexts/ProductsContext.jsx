import { createContext } from "react";
import { WebMartApi } from 'webmart/webmartAPI';

const ProductsContext = createContext()

export function ProductsProvider ({ children }) {

    const getProducts = (endpoint = "products") => {
        return WebMartApi({
            endpoint, method: "GET",
        }).then((response) => {
            return response
        })
    }

    const getProductDetails = () => {}

    const getCategories = () => {}

    return (
        <ProductsContext.Provider
            value = {{ getProducts, getProductDetails, getCategories }}
        >
            { children }
        </ProductsContext.Provider>
    )
}

export { ProductsContext }