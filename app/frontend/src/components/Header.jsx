import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import '../styles/header.css';

export default function Header({ title, searchEnabled }) {
  const [bar, setBar] = useState(false);

  return (
    <div className="headerContainer">
      <div className="topContainer">
        <h3 
          data-testid="page-title"
          className="headerTitle"
        >
            { title }
        </h3>

        { searchEnabled ? (
          <button
            className="buttonHeader"
            type="button"
            onClick={ () => setBar(!bar) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search"
            />
          </button>)
          : ''}
        <Link to="profile" className="buttonHeader">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
      </div>
      {bar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchEnabled: PropTypes.bool,
}.isRequired;
