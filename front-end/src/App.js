/** @format */

import { useDispatch } from "react-redux";
import { fetchProductCategory } from "./action-creators/Product.actions";
import RouterRoutes from "./Router.routes";
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductCategory());
  },[dispatch]);

  return (
    <div className="App">
      <RouterRoutes />
    </div>
  );
}

export default App;
