import { useEffect, useState } from "react";
import classes from "./MealList.module.css";
import Card from "./Card";
import MealItem from "./MealItem";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, sethttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-5604a-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setIsLoading(false);
      setMeals(loadedMeals);
    };

    fetchMeals().catch((error) =>{
      sethttpError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if(httpError){
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem key={meal.id} meal={meal}></MealItem>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default MealList;
