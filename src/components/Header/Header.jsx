import { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImg from "../../assests/meals.jpg";
import CartButton from "./CartButton/CartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <CartButton onOpenModal={props.onOpenModal}></CartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="" />
      </div>
    </Fragment>
  );
};
export default Header;
