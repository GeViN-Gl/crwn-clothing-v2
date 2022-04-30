import "./cart-dropdown.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  let navigate = useNavigate();
  const navigateToCheckOut = () => {
    navigate(`/checkout`);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Button onClick={navigateToCheckOut}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
