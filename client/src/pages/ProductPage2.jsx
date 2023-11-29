import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import closeIcon from "../assets/close.png";
import noProductFoundImg from "../assets/noProductFound.jpg";

// In this Page we are implementing filters by using adding the filters value to the url params
// when apply filters is clicked and we are also maintaining states here

function ProductPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const newQueryParams = new URLSearchParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get("/api/products/");
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const createFilters = () => {
      for (const [key, value] of queryParams.entries()) {
        newQueryParams.append(key, value);
      }
      for (const [key, value] of newQueryParams.entries()) {
        console.log(key , value)
     }
    };

    

    fetchData()
    createFilters()
  }, [location.search]);

  
  useEffect(()=> {

    const createFilteredData = () =>  {

        const d = data.filter((product)=>{

            for (const [key, value] of newQueryParams.entries()) {
                console.log(key , value)
                if (key === 'category' && value !== product[key] ){
                    return false
                } 
                else if ((key === 'min' || key === 'max')) {

                    if(key==='min') {   
                        

                    }

                }


             }


        })



    }
    createFilteredData()

  } ,[])



}
export default ProductPage;
