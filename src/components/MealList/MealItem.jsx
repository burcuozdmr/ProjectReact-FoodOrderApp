import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount : amount,
      price: props.meal.price
    })
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <p className={classes.description}>{props.meal.description}</p>
        <p className={classes.price}>${props.meal.price}</p>
      </div>
      <MealItemForm onAddToCart = {addToCartHandler}></MealItemForm>
    </li>
  );
};

export default MealItem;
