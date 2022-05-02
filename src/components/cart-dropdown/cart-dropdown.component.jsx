import { CartDropdownContainer, CartItems } from "./cart-dropdown.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  let navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate(`/checkout`);
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
