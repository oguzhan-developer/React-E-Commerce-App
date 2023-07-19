const BASE_URL = "http://localhost:3004/products"

export const getProducts = async() => {
    const response = await fetch(BASE_URL)
    return await response.json()

}