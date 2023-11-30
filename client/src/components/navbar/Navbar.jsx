import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartIcon from "../../assets/shopping-cart.svg";
import searchIcon from "../../assets/search.svg";
import accountIcon from "../../assets/user.svg";
import arrowdown from "../../assets/angle-small-down.svg";
import useUserStore from "../../store.js";

function Navbar() {
  const { user, removeUser } = useUserStore();
  const [searchText, setSearchText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [clickedSearch, setClickedSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown when clicking outside
      // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      //   setIsHovered(false);
      // }

      // Close search input when clicking outside
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.classList.contains("search-icon") &&
        !event.target.closest(".search-component")
      ) {
        setClickedSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const toggleName = () => {
    setIsHovered(!isHovered);
  };

  const toggleSearch = () => {
    setClickedSearch(!clickedSearch);
  };

  function searchFunction() {
    console.log(searchText);
    navigate(`/products?search=${searchText}`);
  }

  const logoutUser = () => {
    removeUser();
    navigate("/login");
  };

  return (
    <nav className="text-black md:bg-bg shadow-stripe text-lg mb-8 px-4 py-4 items-center flex overflow-hidden w-full lg:px-20 justify-between">
      <Link
        className="lg:inline-block font-Robotic text-xl hover:text-accent"
        to="/"
      >
        Cosmos
      </Link>
      <div className="hidden lg:flex items-center gap-8">
        <Link to="/products?category=Men" className="hover:text-accent">
          MEN
        </Link>
        <Link to="/products?category=Women" className="hover:text-accent">
          WOMEN
        </Link>
      </div>
      <div className="hidden md:flex w-full lg:w-2/5 gap-2 bg-bg border-black border items-center justify-between rounded-md pl-4 py-1">
        <input
          ref={searchInputRef}
          type="text"
          name="search"
          className="border-none outline-none w-full text-md"
          placeholder="Search minimal.com"
          required
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="border-l px-2 hover:bg-gray-200 h-full rounded"
          onClick={() => searchFunction()}
        >
          Search
        </button>
      </div>
      <div className="flex gap-[18px] md:gap-8">
        {!user ? (
          <Link className="" to="/register">
            Sign up
          </Link>
        ) : (
          <div>
            
          <div
            className=" flex md:hidden gap-2 z-500 text-lg items-center"
            onClick={toggleName}
          >
            <div className="flex hover:text-accent gap-2 hover:border">
              <img src={accountIcon} alt="" width="15px" height="15px" />
              <p className="">{user?.firstName}</p>
              <img src={arrowdown} alt="" width="15px" height="15px" />
            </div>
            {isHovered && (
              <div
                className="absolute top-[3rem] border bg-bg border-black w-[27vw] md:w-[7.5vw]"
                ref={dropdownRef}
              >
                <div className="hover:bg-gray-200 hover:text-accent w-full px-4">
                  <Link to={`/profile`}>Profile</Link>
                </div>
                <button
                  onClick={logoutUser}
                  className="hover:bg-gray-200 hover:text-accent px-4 w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* ////////////// */}
          <div
            className="hidden md:flex gap-2 text-lg items-center"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className="flex hover:text-accent gap-2 hover:border">
              <img src={accountIcon} alt="" width="15px" height="15px" />
              <p className="">{user?.firstName}</p>
              <img src={arrowdown} alt="" width="15px" height="15px" />
            </div>
            {isHovered && (
              <div
                className="absolute top-[3rem] border bg-bg border-black w-[27vw] md:w-[7.5vw]"
                ref={dropdownRef}
              >
                <div className="hover:bg-gray-200 hover:text-accent w-full px-4">
                  <Link to={`/profile`}>Profile</Link>
                </div>
                <button
                  onClick={logoutUser}
                  className="hover:bg-gray-200 hover:text-accent px-4 w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          </div>
        )}
        <div className="flex">
          <img
            src={searchIcon}
            alt="search btn"
            className="w-[15px] md:hidden search-icon"
            onClick={toggleSearch}
          />
        </div>
        {clickedSearch && (
          <Search
            searchFunction={searchFunction}
            setSearchText={setSearchText}
          />
        )}
        <Link className="flex gap-2 hover:text-accent" to="/cart">
          <img src={cartIcon} alt="" width="15px" height="15px" />
          <h3 className="hidden md:inline-block ">Cart</h3>
        </Link>
      </div>
    </nav>
  );
}

const Search = ({ searchFunction, setSearchText }) => {
  const handleClickInside = (e) => {
    // Prevent the click event from propagating to the document click handler
    e.stopPropagation();
  };

  return (
    <div className="bg-bg" onClick={handleClickInside}>
      <div className="absolute z-10 top-[3.8rem] shadow-mac2 left-[1rem] md:hidden flex w-[90vw] lg:w-2/5 gap-2 bg-bg border-black border items-center justify-between rounded-md pl-4 py-1">
        <input
          type="text"
          name="search"
          className="border-none outline-none w-full text-md"
          placeholder="Search minimal.com"
          required
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="border-l px-2 hover:bg-gray-200 h-fullrounded"
          onClick={() => searchFunction()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
