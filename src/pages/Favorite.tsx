// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'
import { FavoriteItem } from '../types/Favorite'
import FavoriteList from '../components/FavoriteList'
export default function FavoritePage() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState(""); 
  const {
    state: {
      mode,
      favorite: { favoriteItems },
    },
    dispatch,
  } = useContext(Store)
  
  const submitHandler = (e: React.SyntheticEvent) => {
    setSearchValue(e.target.value);
  }
  const itemsFilter = favoriteItems?.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()) 
  ); 
/*
  const updateCartHandler = (item: FavoriteItem, quantity: number) => {
   if (item.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    
    dispatch({
      type: 'FAVORITE_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }
  
  const removeItemHandler = (item: FavoriteItem) => {
    dispatch({ type: 'FAVORITE_REMOVE_ITEM', payload: item })
  }
*/
  return ( 
   <div>
    <div className="d-flex flex-column align-items-center justify-content-center">
    <div className="search">

      <input
        type="text"
        placeholder="Поиск..."
        style={{width:"280px", padding:"10px", backgroundColor:"transparent", border:"none", outline:"none"}}
        value={searchValue}
        onChange={submitHandler}
      /> 
          <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
      </div>
         <select className="mt-5" onChange={(e) => setCategory(e.target.value)}>
            <option disabled selected>
              категории
           </option>
            <option value="">Все</option>
            <option value="/category/women's clothing">Женская одежда</option>
            <option value="category/men's clothing">Мужская одежда</option>
            <option value="category/jewelery">Украшения</option>
            <option value="category/electronics">Электроника</option>
             </select> 
     </div>     
 
               <FavoriteList itemsFilter={itemsFilter}/>
     

   
      {/*
        <Col md={8}>
          {favoriteItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {favoriteItems.map((item: FavoriteItem) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid rounded thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.id}`}>{item.title}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant={mode}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>
                    {/*  disabled={item.quantity === item.countInStock}
                      */} {/*
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant={mode}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({favoriteItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {favoriteItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>

                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        */}
      </div>
   
  )
}
