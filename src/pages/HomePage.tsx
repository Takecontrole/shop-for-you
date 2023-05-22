import React, { useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { useGetProductsQuery } from '../hooks/productHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function HomePage() { 
  const [abc, setAbc] = useState(""); 
  const { data: products, isLoading, error } = useGetProductsQuery(abc!)
 const [searchValue, setSearchValue] = useState(""); 
 const [ price, setPrice ] = useState(0);

  // Triggered when the value gets updated while scrolling the slider:
  const handleInput = (e)=>{
    setPrice( e.target.value );
  }
  

  const submitHandler = (e: React.SyntheticEvent) => {
    setSearchValue(e.target.value);
  }
  const itemsFilter = products?.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()) 
  ); 
 
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>TS Amazona</title>
      </Helmet>
      <input
        className="search__input"
        type="text"
        placeholder="Enter product name"
        value={searchValue}
        onChange={submitHandler}
      /> 
         <select onChange={(e) => setAbc(e.target.value)}>
            <option value="asc">по возрастанию</option>
            <option value="desc">по убыванию</option>
             </select> 
                   <input type="range" min="0" max="1000" onInput={ handleInput } />
      <h1>Price: { price }</h1>
      <div>
      { itemsFilter.filter( product => { return product.price > parseInt(price, 10) }).map( product => {
        return <div key={product.title}>        <Col key={product.id} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col> &euro; </div>
      })}        
      </div>

    </Row>
  )
}
