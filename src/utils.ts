import { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart'
import { Product } from './types/Product'

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    id: product.id,
    title: product.title,
    id: product.id,
    image: product.image,
    price: product.price,
    quantity: 1,
  }
  return cartItem
}
   // countInStock: product.countInStock,
