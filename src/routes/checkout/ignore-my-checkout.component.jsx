import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckOut = () => {
  const { cartItems, modifyCartItemsById, cartTotal } = useContext(CartContext);

  const CheckoutItem = ({ item }) => {
    console.log(item);
    const { id, name, quantity, price } = item;

    const callbackDelete = () => {
      // console.log(`my id is ${id}, i deleted `);
      modifyCartItemsById(id, null, true);
    };

    const callbackPlus = () => {
      //
      modifyCartItemsById(id, 1);
    };
    const callbackMinus = () => {
      //
      modifyCartItemsById(id, -1);
    };

    return (
      <div>
        <h2>{name}</h2>
        <div>
          <span onClick={callbackPlus}>{` + `}</span>
          {quantity}
          <span onClick={callbackMinus}>{` - `}</span>
          <span>{` = $${price}`}</span>
          <span onClick={callbackDelete}>{` x`}</span>
          <div>total {`${cartTotal}`}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      CheckOut
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default CheckOut;
