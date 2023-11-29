import React, { useState, useEffect , useMemo } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import closeIcon from "../assets/close.png";
import noProductFoundImg from "../assets/noProductFound.jpg";
import Loading from "../components/Loading"
import axiosInstance from "../axios";

// In this Page we are implementing filters by using adding the filters value to the url params 
// when apply filters is clicked and we are also maintaining states here 

function ProductPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [distinctSubCategory, setDistinctSubCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [search, setSearch] = useState("");
  const [subCategory, setSubCategory] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await axiosInstance.get("/api/products/");
      setData(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const createFilters =   () => {
    const temp = {};
    for (const [key, value] of queryParams.entries()) {
      temp[key] = value;
      if (key === "search") setSearch(value);
      if (key === "category") setCategory(value);
      if (key === "subCategory") t(value);
      if (key === "min") setMinPrice(parseInt(value));
      if (key === "max") setMaxPrice(parseInt(value));
    }
    setFilters(temp);

  };


  const t = (v) => {
    const value = v.split(",");
    setSubCategory((prev) => {
      const temp = [...prev];
      value.forEach((x) => {
        if (!prev.includes(x)) {
          temp.push(x);
        }
      });
      return temp;
    });
  };

  const filterData = () => {
    setFilteredData(
      data.filter((product) => {
        for (const key in filters) {
          const filterValue = filters[key];
  
          if (key === "min" || key === "max") {
            const price = parseFloat(product.price);
            if (!(price >= parseFloat(filters.min) && price <= parseFloat(filters.max))) {
              return false;
            }
          } else if (key === "search") {
            const searchValues = filters[key].toLowerCase().split(" ");
            const productName = product.name.toLowerCase();
            const tags = product.tags.map(tag => tag.toLowerCase());
  
            // Check if any search term is present in the product name or tags
            if (!searchValues.some(searchValue => productName.includes(searchValue) || tags.includes(searchValue))) {
              return false;
            }
          } else if (key === "subCategory") {
            const subCategories = filterValue.split(",");
            if (!subCategories.includes(product[key])) {
              return false;
            }
          } else if (key === "category" && product[key] !== filterValue) {
            return false;
          } else if (product[key] !== filterValue) {
            return false;
          }
        }
        return true;
      })
    );
  };
  

  useEffect(() => {
    fetchData();
    createFilters();
  }, [location.search]);

  useEffect(  () => {
    async function distinctSubcategory ( ) {
      //console.log(category)
      if (category === '') {
        const distinct = await axiosInstance.get(`/api/products/unique/subCategory`);
        setDistinctSubCategory(distinct.data);
      }
      const distinct = await axiosInstance.get(`/api/products/unique/subCategory/${category}`);
      setDistinctSubCategory(distinct.data);
    }
    distinctSubcategory()
    filterData();
  }, [filters, data]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    setShowFilters(false)
 
    const queryString = Object.entries({
      search: search || undefined, // include search only if it's not empty
      category,
      min: isNaN(minPrice) ? 0 : parseInt(minPrice),
      max: isNaN(maxPrice) ? 10000 : parseInt(maxPrice),
      subCategory: subCategory.length > 0 ? subCategory.join(',') : undefined,
    })
      .filter(([key, value]) => value !== undefined) // exclude undefined or empty values
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  
    // Navigate to the new URL with filters
    navigate(`/products?${queryString}`);
  };

  const addToSubCategory = (value) => {
    setSubCategory((prev) => {
      return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="w-max m-4 hidden md:inline-block">
        <h3>Filters</h3>
        <div>
          <hr className="text-[rgba(0,0,0,0.5)] my-4" />
          <h3>Gender </h3>
          <div className="flex gap-4 mb-4">
            <div className="flex gap:2">
              <input
                type="radio"
                name="gender"
                value="Men"
                checked={category === "Men"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="men">Men</label>
            </div>
            <div className="flex gap:2">
              <input
                type="radio"
                name="gender"
                value="Women"
                checked={category === "Women"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="women">Women</label>
            </div>
          </div>

          <h3>Price</h3>
          <div className="flex gap-1 mb-4 ">
            <input
              type="number"
              placeholder={0}
              className="w-20 border-[1px] border-[rgba(0,0,0,0.3)] px-2"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
            />
            <h3>-</h3>
            <input
              type="number"
              placeholder={10000}
              className="w-20 border-[1px] border-[rgba(0,0,0,0.3) px-2"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
          </div>
          <div>
            <h3>Sub category</h3>
            {distinctSubCategory &&
              distinctSubCategory.map((sub) => {
                //console.log(sub);
                return (
                  <div key={sub} className="flex gap-4">
                    <input
                      type="checkbox"
                      name={sub}
                      value={sub}
                      onChange={(e) => addToSubCategory(e.target.value)}
                      checked={subCategory.includes(sub)}
                    />
                    <label htmlFor={sub}>{sub}</label>
                  </div>
                );
              })}
          </div>
          <button onClick={applyFilters} className="px-4 py-2 hover:bg-accent/80 hover:shadow-stripe bg-accent my-4">
            Apply Filters
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3">

      {}

        {Object.keys(filteredData).length != 0 ? (
          filteredData.map((product) => {
           // console.log(product._id)
            return (
            <ProductCard
              key={product._id || product.name}
              data={{
                ...product,
                imageUrl: `http://localhost:5000/uploads/${product.imageUrl[0]}`,
                SImageUrl: `http://localhost:5000/uploads/${product.imageUrl[1]}`,
              }}
            />
          )})
        ) : (
          <div className="flex justify-center w-[100vw] md:w-[80vw] ">
            <img
              src={noProductFoundImg}
              alt="No Product Found"
              className=" md:h-[70vh] md:w-[50vw] w-[80vw] h-[70vh]"
            />
          </div>
        )}
      </div>
      {/* Mobile filters */}
      {showFilters && (
        <div className="fixed bottom-14 p-4 left-8 bg-bg w-4/5 h-4/5 shadow-mac">
          <div className="flex justify-between">
            <h1 className="">Filters:</h1>
            <button onClick={() => setShowFilters(false)}>
              <img
                src={closeIcon}
                alt="closeBtn"
                srcset=""
                className="w-4 h-4"
              />
            </button>
          </div>

          <hr className="text-[rgba(0,0,0,0.5)] my-4" />
          <h3>Gender </h3>
          <div className="flex gap-4 my-2">
            <div className="flex gap:2">
              <input
                type="radio"
                name="gender"
                value="Men"
                checked={category === "Men"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="men">Men</label>
            </div>
            <div className="flex gap:2">
              <input
                type="radio"
                name="gender"
                value="Women"
                checked={category === "Women"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="women">Women</label>
            </div>
          </div>

          <h3>Price</h3>
          <div className="flex gap-1 my-2 ">
            <input
              type="number"
              placeholder={0}
              className="w-20 border-[1px] border-[rgba(0,0,0,0.3)] px-2"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
            />
            <h3>-</h3>
            <input
              type="number"
              placeholder={10000}
              className="w-20 border-[1px] border-[rgba(0,0,0,0.3) px-2"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
          </div>
          <div>
            <h3>Sub category</h3>
            {distinctSubCategory &&
              distinctSubCategory.map((sub) => {
                //console.log(sub);
                return (
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      name={sub}
                      value={sub}
                      onChange={(e) => addToSubCategory(e.target.value)}
                      checked={subCategory.includes(sub)}
                    />
                    <label htmlFor={sub}>{sub}</label>
                  </div>
                );
              })}
          </div>
          <button
            onClick={applyFilters}
            className=" absolute bottom-2 right-2 px-4 py-2 bg-accent"
          >
            Apply Filters
          </button>
        </div>
      )}

      <button
        className="fixed bottom-2 right-8 bg-secondary shadow-mac text-bg px-4 py-2 md:hidden"
        onClick={toggleFilters}
      >
        Filters
      </button>
    </div>
  );
}

export default ProductPage;