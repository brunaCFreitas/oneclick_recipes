import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUser } from '../services/userLS';

import '../styles/profile.css';

export default function Profile() {
  const userEmail = getUser();

  return (
    <div className="test">
      <Header title="Profile" />
      <div className="profileContainer">
        <span data-testid="profile-email">{ userEmail }</span>
        <div className="buttonsContainer">
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>

          <Link to="/favorite-recipes">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>

          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
