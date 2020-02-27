import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import Product from "./Components/Product";
import ProductAdmin from "./Components/Admin/ProductAdmin";
import ProductPatch from "./Components/Admin/ProductPatch"
import ProductCreate from "./Components/Admin/ProductCreate";

import Weather from "./Components/Weather/Weather";


// import CreateCartoon from "../../backend/public/images/";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/productAdmin" component={ProductAdmin} />
          <Route path="/productcreate" component={ProductCreate} />
          <Route path="/ProductPatch/:product_id" component={ProductPatch} />
          <Route path="/weather" component={Weather} />
          <Route path="/:product_id" component={Product} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
