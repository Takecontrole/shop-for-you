// @ts-nocheck
import { useEffect, useState } from "react";
import FavoriteCard from "./FavoriteItem"

const FavoriteList = ({ itemsFilter }) => {
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ price, setPrice ] = useState(0);
 const [sort, setSort] = useState("asc");
  const handleInput = (e: React.SyntheticEvent)=>{
    setPrice( e.target.value );
  }
const handleFilters = (e: React.SyntheticEvent) => {
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
   <div className="d-flex flex-column flex-md-row justify-content-center mt-5">
    <div className="d-flex flex-column m-5">
   <p>Сортировать по алфавиту:</p>                    <select  onChange={(e) => setSort(e.target.value)}>
            <option value="Сверху вниз">Сверху вниз</option>
            <option value="Снизу вверх">Снизу вверх</option>
             </select> 
             </div> 
                             <div className="d-flex flex-column align-items-center m-5">
           <input type="range" min="0" max="1000" onInput={ handleInput } />
      <p>цены от: { price } $</p>
       </div>
                 <div className="d-flex flex-column m-5">
              <p>Сортировать по цене:</p>
         <select onChange={(e) => setSort(e.target.value)}>
            <option value="asc">(увл)</option>
            <option value="desc">(умен)</option>
                         </select>
            </div>
            </div>

      { filteredProducts.filter( product => { return product.price > parseInt(price, 10) }).map( product => {
        return <div style={{width:"50%"}} key={product.title}> <div key={product.id} >
          <FavoriteCard product={product} />
        </div> </div>
      })}        
    </div>
  );
};

export default FavoriteList;
/* : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} /> */