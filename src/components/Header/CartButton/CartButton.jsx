import { useContext, useEffect, useState } from 'react';
import classes from './CartButton.module.css';
import CartIcon from './CardIcon';
import CartContext from '../../../store/cart-context';

const CartButton = (props) =>{
  const [btnBump, setBtnBump] = useState(false);
  const cartCtx = useContext(CartContext);
  
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber,item) =>{return curNumber + item.amount},0);

  
  const btnClasses = `${classes.button} ${btnBump && classes.bump}`

  useEffect(() => {
    if(cartCtx.items.length === 0) {
      return;
    }
    setBtnBump(true);

    const timer = setTimeout(() =>{
      setBtnBump(false);
    },300);

    return () => {
      clearTimeout(timer);
    };

  }, [items]);

  return(
    <button className={btnClasses} onClick={props.onOpenModal}>
      <span className={classes.icon}><CartIcon></CartIcon></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default CartButton;