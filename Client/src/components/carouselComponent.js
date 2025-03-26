import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Container } from "react-bootstrap";
import "../styles/style.css";

const CarouselComponent = () => {
  const navigate = useNavigate();
  
  return (
    <Container fluid className="p-0">
    <Carousel interval={2000} pause={false} wrap={true} className="w-100"> 
      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="https://assets.mspimages.in/gear/wp-content/uploads/2021/06/Mi-Notebook-Pro-X.jpg"
            alt="First slide"
          />
          <div className="carousel-description">
            <h4>MacBook Pro:MacBook Pro: A Blend of Power and Elegance.</h4>
            
            <p>
            The MacBook Pro is a powerful laptop with great features. It boasts a sleek design, a high-resolution Retina display, and a fast M1 chip processor.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/products")}>View Product</button>
            
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="https://img.freepik.com/premium-photo/laptop-left-view-dark-background_187299-27825.jpg"
            alt="Second slide"
          />
          <div className="carousel-description">
            <h4>HP Laptop</h4>
            <p>The HP Spectre x360 is a powerful laptop with great features. It boasts a sleek design, a high-resolution touchscreen display, and a fast Intel Core i7 processor.</p>
            <button className="btn btn-primary" onClick={() => navigate("/products")}>View Product</button>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="https://media.cnn.com/api/v1/images/stellar/prod/200622140313-12-apple-wwdc-special-event-0622-screenshot.jpg?q=x_2,y_0,h_1115,w_1981,c_crop"
            alt="Second slide"
          />
          <div className="carousel-description">
            <h4>Apple Watch Series 8:A Perfect Blend of Technology and Style.</h4>
            <p>The Apple Watch Series 8 is a powerful smartwatch with great features. It boasts a sleek design, a high-resolution Retina display, and advanced health monitoring capabilities.</p>
            <button className="btn btn-primary" onClick={() => navigate("/products")}>View Product</button>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="https://img.freepik.com/premium-photo/modern-smart-phone-illuminates-dark-background-with-glowing-touch-screen-generated-by-ai_24640-106041.jpg"
            alt="Second slide"
          />
          <div className="carousel-description">
            <h4>QSamsung Galaxy S21: A Powerful Smartphone with Cutting-Edge</h4>
            <p>The Samsung Galaxy S21 is a powerful smartphone with great features. It boasts a sleek design, a high-resolution triple camera system, and a fast Exynos 2100 processor.</p>
            <button className="btn btn-primary" onClick={() => navigate("/products")}>View Product</button>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="https://blog.playstation.com/uploads/2023/08/ba6b00a5a86591444e46a76acd5a2052267ba27b.jpg"
            alt="Second slide"
          />
          <div className="carousel-description">
          <h4>PlayStation 5: Next-Gen Gaming Experience</h4>
<p>The PlayStation 5 offers an unparalleled gaming experience with its powerful hardware. It features stunning 4K HDR graphics, incredibly fast loading speeds, and an innovative DualSense controller with haptic feedback.</p>
<button className="btn btn-primary" onClick={() => navigate("/products")}>View Product</button>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <img
            className="carousel-image"
            src="https://thumbs.dreamstime.com/b/wrist-watch-dark-background-photo-nice-black-71286422.jpg"
            alt="Second slide"
          />
          <div className="carousel-description">
            <h4>G-SHOCK GBDH2000</h4>
            <p>The G-SHOCK GBDH2000 is a powerful digital watch with great features. It boasts a sleek design, high-resolution display, and advanced fitness tracking capabilities</p>
            <button className="btn btn-secondary ms-2" onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
    </Container>
  );
};

export default CarouselComponent;