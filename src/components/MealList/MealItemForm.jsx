import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const inputRef = useRef(null);
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5 ){
      setAmountIsValid(false);
      return;
    }
    
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.input}>
        <label htmlFor="amount-input">Amount</label>
        <input
          ref={inputRef}
          id="amount-input"
          type="number"
          min={1}
          max={5}
          step={1}
          defaultValue={1}
        />
      </div>
      <button type="submit">+Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
