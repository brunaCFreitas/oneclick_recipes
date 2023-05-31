// How to Make a Simple React Carousel - https://dev.to/rakumairu/simple-react-carousel-24m0

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from '../context/DrinksContext';
import FoodContext from '../context/FoodContext';
import '../styles/carousel.css';
import Recommendations from './Recommendations';

export default function CarouselContainer({ pathname, show }) {
  const context = pathname === 'drinks' ? FoodContext : DrinksContext;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { recipes } = useContext(context);
  const THREE = 3;

  const next = () => {
    if (currentIndex < (THREE - 1)) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  if (recipes[0] === undefined) return <div>Loading...</div>;
  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button
          className="left-arrow"
          onClick={ prev }
        >
          &lt;
        </button>
        <div className="carousel-content-wrapper">
          <div
            className={ `carousel-content show-${show}` }
            style={ { transform: `translateX(-${currentIndex * 100}%)` } }
          >
            <Recommendations
              recipes={ recipes }
              currentIndex={ currentIndex }
            />
          </div>
        </div>
        <button
          className="right-arrow"
          onClick={ next }
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

CarouselContainer.propTypes = {
  pathname: PropTypes.string,
  show: PropTypes.number,
}.isRequired;
