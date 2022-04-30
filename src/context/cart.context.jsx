import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains product to add

  /* //---------my solution  
  let index = cartItems.findIndex((cartItem) => cartItem.id === productToAdd.id);
  if (index !== -1) {
    cartItems[index].quantity++;
  } else {
    cartItems.push({ ...productToAdd, quantity: 1 });
  }
  return cartItems;*/

  // teacher

  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  modifyCartItemsOnPosition: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  /** Will recive click on some product cart in shop and do:
   *
   * if product exist in cartDropdown add ++ to it
   * else create new entry to array of product in cartdropdown array
   *
   */
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity),
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, carditem) => (total += carditem.quantity * carditem.price),
      0
    );

    setCartCount(newCartCount);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  //------------------- MY
  const modifyCartItemsOnPosition = (id, valueToAdd = 0, remove = false) => {
    const removeItem = (id) => {
      const modifiedCartItems = cartItems.filter((item) => item.id !== id); //return all NOT equal to id from argumet
      setCartItems(modifiedCartItems);
    };

    //
    if (remove) {
      removeItem(id);
      return;
    }

    const modifiedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        item.quantity += valueToAdd;
      }
      return item;
    });
    const checkedForZeroes = modifiedCartItems.filter((item) => item.quantity !== 0);
    console.log(checkedForZeroes);
    setCartItems(checkedForZeroes);
  };

  // useEffect(() => {
  //   const filteredForZeroes = cartItems.filter((item) => item.quantity !== 0);
  //   setCartItems(filteredForZeroes);
  // }, [cartItems]);

  //------------------- MY

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    modifyCartItemsOnPosition,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
