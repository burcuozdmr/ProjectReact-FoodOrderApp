import { useRef, useState } from "react";
import classes from "./Form.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const isTenChars = (value) => value.trim().length === 10;

const Form = (props) => {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    phone: true,
    city: true,
    street: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPhoneIsValid = isTenChars(enteredPhone);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      phone: enteredPhoneIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredPhoneIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      phone: enteredPhone,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    })
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid} `}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.phone ? '' : classes.invalid} `}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          ref={phoneInputRef}
          placeholder="ex. 5545454454"
        />
        {!formInputsValidity.phone && <p>Please enter a valid phone number! (10 characters long)</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid} `}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid} `}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid} `}>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          ref={postalCodeInputRef}
          placeholder="ex. 05147"
        />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code! (5 characters long)</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Form;
