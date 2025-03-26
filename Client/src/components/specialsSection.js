import React, { useState } from "react";
import "../styles/style.css";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
 

const specialsData = [
  {
    category: "Featured Item",
    name: "Apple iPhone 6",
    image: "https://th.bing.com/th/id/OIP._L7RZ2Xx-az4pdAIar6pnwHaEK?w=1200&h=674&rs=1&pid=ImgDetMain",
    description: "one of the most featured item.",
    seldesc: "Display: 4.7-inch Retina HD display.Camera: 8-megapixel iSight camera with autofocus and 1080p HD video recording1.",
    price: "Rs.45,999",
    rating: 4.5
  },
  {
    category: "Best Seller",
    name: "Samsung Galaxy S21",
    image: "https://img.mensxp.com/media/content/2021/Jan/Image-1---Header---TwitterIce-Universe_600056f667491.jpeg",
    description: "our bestSeller",
    seldesc: "The Samsung Galaxy S21 features a 6.2-inch Dynamic AMOLED 2X display, Exynos 2100/Snapdragon 888 chipset, 8GB RAM, and a 4000mAh battery",
    price: "Rs.55,999",
    rating: 4.7
  },
  {
    category: "Summer Discount",
    name: "PlayStation 5 (PS5)",
    image: "https://cdn.wccftech.com/wp-content/uploads/2024/03/ps5-pro-mockup-HD-scaled.jpg",
    description: "shop PS5 its never too late to shop",
    seldesc: "4K HDR Graphics: Stunning visuals with consistent frame rates1.Fast Loading Speeds: Thanks to its custom SSD",
    price: "Rs.3,499",
    rating: 4.3
  },
  {
    category: "Premium Product",
    name: "MacBook Pro",
    image: "https://th.bing.com/th/id/R.54dcfa0c3376d68ab0c88ed85842c1ce?rik=MtKPVilJnWvA1w&riu=http%3a%2f%2fstatic4.businessinsider.com%2fimage%2f50a649c669bedd000a00000b-1190-625%2freview-apples-13-inch-retina-macbook-pro.jpg&ehk=hzuvwOija%2ftnjGWJmQ6THjNL32YP9UbP9D2xbm%2f3lFI%3d&risl=&pid=ImgRaw&r=0",
    description: "A powerful laptop for professionals.",
    seldesc: "The MacBook Pro features powerful M4 family chips, a stunning Liquid Retina XDR display.",
    price: "Rs.1,29,999",
    rating: 4.8
  },
  {
    category: "Gift Idea",
    name: "Apple Watch",
    image: "https://th.bing.com/th/id/OIP.O5-buxXRVv8XZYnJNnfsSgAAAA?w=474&h=266&rs=1&pid=ImgDetMain",
    description: "A great gift for any occasion.",
    seldesc: "Health Monitoring: Tracks heart rate, sleep patterns, and even provides ECG readings1.Fitness Tracking: Measures various workouts, including running, cycling etc",
    price: "Rs.29,999",
    rating: 4.6
  }
];
 
const SpecialsSection = () => {
  const navigate = useNavigate();
  const [selectedSpecial, setSelectedSpecial] = useState(specialsData[0]);
  const [showModal, setShowModal] = useState(false);
 
  const handleShowModal = (special) => {
    setSelectedSpecial(special);
    setShowModal(true);
  };
 
  return (
    <div className="container mt-4 specials-section">
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column justify-content-between p-3" style={{ width: "40%" }}>
          {specialsData.map((item, index) => (
            <button
              key={index}
              className={`btn my-1 ${selectedSpecial.category === item.category ? "btn-primary text-white" : "btn-outline-primary"}`}
              onClick={() => setSelectedSpecial(item)}
              style={{ flexGrow: 1 }}
            >
              {item.category}
            </button>
          ))}
        </div>
       
        <div className="p-3 d-flex flex-column align-items-center justify-content-center" style={{ width: "60%", textAlign: "center" }}>
          <img
            src={selectedSpecial.image}
            className="img-fluid"
            alt={selectedSpecial.name}
            style={{ maxHeight: "200px", width: "400px", borderRadius: "0px" }}
          />
          <h6 className="mt-2">{selectedSpecial.name}</h6>
          <p style={{ fontSize: "0.85rem", margin: "5px 0" }}>{selectedSpecial.description}</p>
          <button className="btn " onClick={() => handleShowModal(selectedSpecial)}>Read More</button>
        </div>
      </div>
     
      {/* Modal for Product Details */}
      {showModal && (
        <div className="special-modal" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "500px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "10px",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          textAlign: "center",
          zIndex: 10
        }}>
          <div className="modal-content-custom">
            <img src={selectedSpecial.image} alt={selectedSpecial.name} className="modal-image" style={{ width: "100%", borderRadius: "10px" }} />
            <div className="modal-text">
              <p><strong>Price:</strong> {selectedSpecial.price}</p>
              <p><strong>Rating:</strong> ⭐ {selectedSpecial.rating}/5</p>
              <p><strong>Description:</strong> {selectedSpecial.seldesc}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2 gap-2">
          <Button variant="primary" onClick={() => setShowModal(false)} className="mt-7">
            Close
          </Button>
          <Button variant="primary" 
            onClick={()=>navigate(`/filtered-products?category=${selectedSpecial.category}`)}
          >
            View More
          </Button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default SpecialsSection;