import { useContext, useEffect } from "react";
import { Header } from "./components/Header";
import MealCard from "./components/MealCard";
import { httpService } from "./utils/httputils";
import useHttpRequest from "./hooks/fetching";
import {CartContext} from "./context/CartContext";

function App() {
  const ctx = useContext(CartContext);
  const { isFetching, data, error } = useHttpRequest(httpService.getMeals);

  let dataBlock = <></>;

  if (error) {
    dataBlock = (<p>Error: {error.message}</p>);
  } else if (isFetching) {
    dataBlock = (<p>Loading...</p>);
  } else if (data) {
    dataBlock = data.map((meal) => <MealCard key={meal.id} data={meal} onAddToCart={() => ctx.addToCart(meal)} />);
  } else {
    dataBlock = (<p>No data</p>);
  }

  return (
    <>
      <Header />
      <div id="meals">
        {dataBlock}
      </div>
    </>
  );
}

export default App;
