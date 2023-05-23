import { useEffect, useState } from "react";
import axios from "../axios";
import ProductItem from "./ProductItem"

const ProductList = ({ itemsFilter }) => {
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ price, setPrice ] = useState(0);
 const [sort, setSort] = useState("asc");
  const handleInput = (e: React.SyntheticEvent)=>{
    setPrice( e.target.value );
  }
const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
    useEffect(() => {
      setFilteredProducts(
        itemsFilter.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [itemsFilter, filters]);
  useEffect(() => {
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    } else if (sort === "Снизу вверх") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (sort === "Сверху вниз") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
      );
    } else {
      
    }
  }, [sort]);
/*
 const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `/products/category/${category}`
            : "/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [category]);
  
  useEffect(() => {
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    } else {
      
    }
  }, [sort]);
*/
  return (
    <div>
              <select name="category" onChange={handleFilters}>
            <option disabled selected>
              категории
            </option>
            <option>women's clothing</option>
            <option>electronic</option>
            <option>jewelery</option>
            <option >Mens</option>
          
          </select>

 <h1>Сортировать:</h1>
         <select onChange={(e) => setSort(e.target.value)}>
            <option value="asc">Цена (увл)</option>
            <option value="desc">Цена (умен)</option>
             
            <option value="Сверху вниз">Сверху вниз</option>
            <option value="Снизу вверх">Снизу вверх</option>
             </select>
           <input type="range" min="0" max="1000" onInput={ handleInput } />
      <h1>Price: { price }</h1>
     
      { filteredProducts.filter( product => { return product.price > parseInt(price, 10) }).map( product => {
        return <div style={{width:"50%"}} key={product.title}> <div key={product.id} >
          <ProductItem product={product} />
        </div> </div>
      })}        
    </div>
  );
};

export default ProductList;
/* : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} /> */