import { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext({
  products: [],
  // setProductList: () => null,
});

export const ProductsProvider = ({ children }) => {
  /* exported setProducts */
  const [products, setProducts] = useState(PRODUCTS);

  const value = { products, setProducts };

  // useEffect(() => {
  //   setProductList(PRODUCTS);
  // }, []);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
