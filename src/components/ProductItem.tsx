// @ts-nocheck
import { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'
import { FavoriteItem } from '../types/Favorite'
import { Product } from '../types/Product'
import { convertProductToCartItem } from '../utils'
import { convertProductToFavoriteItem } from '../utils'
//import Rating from './Rating'

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
    favorite: { favoriteItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x.id === product.id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    {/*if (product.countInStock < quantity) {
      //alert('Sorry. Product is out of stock')
      return
    }
    */}
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
    toast.success('Товар добавлен в корзину')
  }
  
  const addToFavoriteHandler = (item: FavoriteItem) => {
    const existFavoriteItem = favoriteItems.find((x) => x.id === product.id)
    const quantity = existFavoriteItem ? existFavoriteItem.quantity + 1 : 1
    {/*if (product.countInStock < quantity) {
      //alert('Sorry. Product is out of stock')
      return
    }
    */}
    dispatch({
      type: 'FAVORITE_ADD_ITEM',
      payload: { ...item, quantity },
    })
    toast.success('Товар добавлен в избранное')
  }

  return (
    <Card>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="card-img-top" alt={product.title} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        {/*
        <Rating rating={product.rating} numReviews={product.numReviews} />
     */}
        <Card.Text>${product.price}</Card.Text>
        {/*
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
        )} 
        */}
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Добавить в корзину
          </Button>
          <Button
            onClick={() => addToFavoriteHandler(convertProductToFavoriteItem(product))}
          >
            Добавить в избранное 
          </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductItem
