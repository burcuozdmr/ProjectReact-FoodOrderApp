import { Fragment, useContext, useState } from "react";
import classes from "./CartTotal.module.css";
import CartItem from "./CartItem";
import Modal from "./Modal";
import CartContext from "../../../store/cart-context";
import Form from "./Form";

const CartTotal = (props) => {
  const [formActive, setFormActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmited, setDidSubmited] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setFormActive(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-5604a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmited(true);
    cartCtx.clearCart();
  };

  const modal = (
    <Fragment>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            ctx={item}
            key={item.id}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          ></CartItem>
        ))}
      </ul>
      <div>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {!formActive && (
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onCloseModal}
            >
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        )}
        {formActive && (
          <Form
            onClose={props.onCloseModal}
            onConfirm={submitOrderHandler}
          ></Form>
        )}
      </div>
    </Fragment>
  );

  const modalSubmitting = <p>Sending Order Data...</p>;
  const modalSubmited = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseModal}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onCloseModal}>
      {!isSubmitting && !didSubmited && modal}
      {isSubmitting && modalSubmitting}
      {didSubmited && modalSubmited}
    </Modal>
  );
};
export default CartTotal;
