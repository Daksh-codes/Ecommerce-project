import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import Cart from "./pages/cart";
import IProductsPage from "./pages/IProductsPage";
import ProductPage from "./pages/ProductPage";
import Profile from "./pages/Profile";
import MobileBottomNav from "./components/MobileBottomNav";
import Footer from "./components/Footer";
import PaymentPage from "./pages/PaymentPage";
import Success from "./pages/Success";
import ProductInsert from "./pages/ProductInsert";
import OrderCancel from "./pages/OrderCancel";
import axios from "axios";
//import ProductPage from "./pages/ProductPage2";

axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  return (
    <div className="overflow-hidden bg-bg  ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<IProductsPage/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/paymentPage" element={<PaymentPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<OrderCancel />} />
          <Route path="/productInsert" element={<ProductInsert />} />
          
        </Routes>
        {/* <MobileBottomNav /> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
