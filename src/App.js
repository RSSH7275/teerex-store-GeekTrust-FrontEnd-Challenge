import './App.css';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import HomePage from "./Components/HomePage";
import Cart from "./Components/Cart";
import {CartDataProvide} from "./HomeContext";

export const config={ endpoint:`https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`};

function App() {
  return (
    <div>
      <CartDataProvide>
        <SnackbarProvider>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/cart" component={Cart} />
      </Switch>
        </SnackbarProvider>
      </CartDataProvide>
  </div>
      
    ); 
  }
  
  export default App;
