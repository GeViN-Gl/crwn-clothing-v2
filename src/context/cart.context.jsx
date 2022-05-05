import { createContext, useReducer } from "react";

/*===========================REDUCER=====================================*/
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CART_ACTION_TYPES = {
  TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(`action`);
  // console.dir(action);

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN: {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    }

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

/*===========================REDUCER=====================================*/

/** Will recive click on some product cart in shop and do:
 *
 * if product exist in cartDropdown add ++ to it
 * else create new entry to array of product in cartdropdown array
 */
const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find it
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //if quantity === 1 remove
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  modifyCartItemsById: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const setIsCartOpen = () =>
    dispatch({
      type: CART_ACTION_TYPES.TOGGLE_CART_OPEN,
    });

  const updateCartItemReducer = (newCartItems) => {
    // // TODO 2 in 1 //DONE
    const { count: newCartCount, total: newCartTotal } = newCartItems.reduce(
      (acc, item) => {
        acc.count += item.quantity;
        acc.total += item.quantity * item.price;
        return acc;
      },
      { count: 0, total: 0 }
    );

    // const newCartCount = newCartItems.reduce(
    //   (total, cartItem) => total + cartItem.quantity,
    //   0
    // );

    // const newCartTotal = newCartItems.reduce(
    //   (total, carditem) => total + carditem.quantity * carditem.price,
    //   0
    // );

    dispatch({
      type: "SET_CART_ITEMS",
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
