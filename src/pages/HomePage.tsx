// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductList from '../components/ProductList'
//import ProductItem from '../components/ProductItem'
import { useGetProductsQuery } from '../hooks/productHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function HomePage() { 
  const [abc, setAbc] = useState(""); 
  const { data: products, isLoading, error } = useGetProductsQuery(abc!)
 const [searchValue, setSearchValue] = useState(""); 
 
  

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
               <ProductList itemsFilter={itemsFilter}/>
     

    </Row>
  )
}
