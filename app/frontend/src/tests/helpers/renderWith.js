import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import DrinksProvider from '../../context/DrinksProvider';
import FoodProvider from '../../context/FoodProvider';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      {component}
    </Router>
  );
}

function withRouterAndProvider(component, history) {
  return (
    <Router history={ history }>
      <FoodProvider>
        <DrinksProvider>
          {component}
        </DrinksProvider>
      </FoodProvider>
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRouterAndProviders(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouterAndProvider(component, history)),
    history,
  };
}
