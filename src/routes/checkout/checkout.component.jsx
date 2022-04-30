import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckOut = () => {
  const { cartItems, modifyCartItemsOnPosition, cartTotal } = useContext(CartContext);

  const CheckoutItem = ({ item }) => {
    console.log(item);
    const { id, name, quantity, price } = item;

    const callbackDelete = () => {
      // console.log(`my id is ${id}, i deleted `);
      modifyCartItemsOnPosition(id, null, true);
    };

    const callbackPlus = () => {
      //
      modifyCartItemsOnPosition(id, 1, false);
    };
    const callbackMinus = () => {
      //
      modifyCartItemsOnPosition(id, -1, false);
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
