// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductList from '../components/ProductList'
import { useGetProductsQuery } from '../hooks/productHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function HomePage() { 
  const [category, setCategory] = useState(""); 
  const { data: products, isLoading, error } = useGetProductsQuery(category!)
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
    <div>
      <Helmet>
        <title>TS Amazona</title>
      </Helmet> 

        
    <div className="d-flex flex-column">
      <input
        className="search__input"
        type="text"
        placeholder="Поиск..."
        style={{maxWidth:"400px"}}
        value={searchValue}
        onChange={submitHandler}
      /> 
         <select  onChange={(e) => setCategory(e.target.value)}>
            <option disabled selected>
              категории
           </option>
            <option value="">Все</option>
            <option value="/category/women's clothing">Женская одежда</option>
            <option value="category/men's clothing">Мужская одежда</option>
            <option value="category/jewelery">jewelery</option>
            <option value="category/electronics">Электроника</option>
             </select> 
     </div>        
               <ProductList itemsFilter={itemsFilter}/>
     

    </div>
  )
}
