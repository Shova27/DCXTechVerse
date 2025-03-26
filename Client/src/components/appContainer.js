import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaFont, FaPlus, FaMinus, FaBold, FaAdjust, FaLightbulb, FaSearchPlus, FaSearchMinus } from "react-icons/fa";
 
const AppContainer = ({ children }) => {
  const [fontSize, setFontSize] = useState(14);
  const [isBold, setIsBold] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [activeButton, setActiveButton] = useState(null);
 
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.style.fontWeight = isBold ? 'bold' : 'normal';
    document.documentElement.classList.toggle('grayscale', isGrayscale);
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.style.transform = `scale(${zoom})`;
    document.body.style.transformOrigin = '0 0'; // Ensure the zoom starts from the top-left corner
 
    const handleClickOutside = (event) => {
      if (!event.target.closest('.toolbar')) {
        setActiveButton(null);
      }
    };
 
    document.addEventListener('click', handleClickOutside);
 
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [fontSize, isBold, isGrayscale, isDarkMode, zoom]);
 
  const toggleBold = () => {
    setIsBold(!isBold);
    document.body.style.fontWeight = isBold ? 'normal' : 'bold';
  };
 
  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
  };
 
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
 
  const increaseFontSize = () => {
    setFontSize(prevSize => prevSize + 2);
    document.documentElement.style.fontSize = `${fontSize + 2}px`;
    setActiveButton('increaseFontSize');
  };
 
  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(12, prevSize - 2));
    document.documentElement.style.fontSize = `${Math.max(12, fontSize - 2)}px`;
    setActiveButton('decreaseFontSize');
  };
 
  const zoomIn = () => {
    setZoom(prevZoom => prevZoom + 0.1);
    setActiveButton('zoomIn');
  };
 
  const zoomOut = () => {
    setZoom(prevZoom => Math.max(0.5, prevZoom - 0.1));
    setActiveButton('zoomOut');
  };
 
  return (
    <div className="app-container">
      <div className="toolbar">
        <Button
          variant="outline-secondary"
          onClick={increaseFontSize}
          style={{ color: activeButton === 'increaseFontSize' ? 'blue' : 'black' }}
        >
          <FaFont /> <FaPlus />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={decreaseFontSize}
          style={{ color: activeButton === 'decreaseFontSize' ? 'blue' : 'black' }}
        >
          <FaFont /> <FaMinus />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={toggleBold}
          style={{ color: isBold ? 'blue' : 'black' }}
        >
          <FaBold />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={toggleGrayscale}
          style={{ color: isGrayscale ? 'blue' : 'black' }}
        >
          <FaAdjust />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={toggleDarkMode}
          style={{ color: isDarkMode ? 'blue' : 'black' }}
        >
          <FaLightbulb />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={zoomIn}
          style={{ color: activeButton === 'zoomIn' ? 'blue' : 'black' }}
        >
          <FaSearchPlus />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={zoomOut}
          style={{ color: activeButton === 'zoomOut' ? 'blue' : 'black' }}
        >
          <FaSearchMinus />
        </Button>
      </div>
      {children}
    </div>
  );
};
 
export default AppContainer;