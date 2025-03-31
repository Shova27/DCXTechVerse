import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar";
import Footer from "./components/footer";
import AppContainer from "./components/appContainer";
import { ProductProvider } from "./context/productContext";
import { AuthProvider } from "./context/authContext";
import Home from "./pages/home";
import Products from "./pages/products";
import MyAccount from "./pages/myAccount";
import AuthPage from "./components/authPage";
import { CartProvider } from "./context/cartContext";
import SearchResults from "./components/searchResult";
import FilteredProducts from "./pages/filteredProducts";
import ProductDetails from "./pages/productDetails";

function App() {
  const [hideSpecialsAndNew, setHideSpecialsAndNew] = useState(false);
 
  return (
    <AuthProvider> {/* Handles authentication */}
    <AppContainer>
      <ProductProvider> {/* Manages products */}
        <CartProvider> {/* Manages cart state */}
          <Router>
          <NavigationBar setHideSpecialsAndNew={setHideSpecialsAndNew}/>
            <Routes>
              <Route path="/" element={<Home hideSpecialsAndNew={hideSpecialsAndNew} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/search-result" element={<SearchResults />} />
              <Route path="/filtered-products" element={<FilteredProducts />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </ProductProvider>
      </AppContainer>
    </AuthProvider>
  );
}
export default App;

