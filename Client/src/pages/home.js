import React, { useRef, useEffect } from "react";
import CarouselComponent from "../components/carouselComponent";
import Product from "./products";
import SpecialsSection from "../components/specialsSection";
 
const Home = () => {
  const whatsNewRef = useRef(null); // Reference for "What's New"
  const specialsRef = useRef(null); // Reference for "Specials"
 

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#whats-new" && whatsNewRef.current) {
      setTimeout(() => {
        whatsNewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else if (hash === "#specials" && specialsRef.current) {
      setTimeout(() => {
        specialsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

    }

  }, []);
  
  return (
  <div>
      {/* What's New Section */}
    <div ref={whatsNewRef} id="whats-new" className="container mt-4">
      <CarouselComponent />
    </div>
    
      {/* Specials Section */}
    <div ref={specialsRef} id="specials" className="container mt-4">
      <SpecialsSection />
    </div>
    
      {/* Products Section */}
    <div className="container mt-4">
      <Product />
    </div>
  </div>

  );

};
 
export default Home;

 


 

