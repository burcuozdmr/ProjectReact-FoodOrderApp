import { useState } from "react";

import Header from "./components/Header/Header";
import SummaryCard from "./components/SummarySection/SummaryCard";
import MealList from "./components/MealList/MealList";
import CartTotal from "./components/Header/Modal/CartTotal";
import CartProvider from "./store/CartProvider";


 
function App() {
  const [showModal,setShowModal] = useState(false);

  const openModal = () =>{
    setShowModal(true);
  }
  const closeModal = () =>{
    setShowModal(false);
  }

  return (
    <CartProvider>
      <Header onOpenModal={openModal}></Header>
      <SummaryCard></SummaryCard>
      {showModal && <CartTotal onCloseModal={closeModal}></CartTotal> }
      <MealList></MealList>
    </CartProvider>
    
  );
}

export default App;
