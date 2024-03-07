import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <span>
        <h2>{props.ctx.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${props.ctx.price}</span>
          <span className={classes.amount}>x {props.ctx.amount}</span>
        </div>
      </span>
      <span className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </span>
    </li>
  );
};
export default CartItem;
