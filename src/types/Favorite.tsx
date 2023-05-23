export type FavoriteItem = {
  image: string | undefined
  id: number
  quantity: number
  price: number
  title: string
} 
export type fShippingAddress = {
  fullName: string
  address: string
  city: string
  country: string
  postalCode: string
}

export type Favorite= {
  FavoriteItems: FavoriteItem[]
  shippingAddress: fShippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}