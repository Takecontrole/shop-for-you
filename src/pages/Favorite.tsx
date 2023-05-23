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
      <Helmet>
        <title>Избранное</title>
      </Helmet>
      <h1>Избранное</h1>
      <Row>
      
      
      
            <input
        className="search__input"
        type="text"
        placeholder="Поиск..."
        style={{maxWidth:"400px"}}
        value={searchValue}
        onChange={submitHandler}
      /> 
 
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
      </Row>
    </div>
  )
}
