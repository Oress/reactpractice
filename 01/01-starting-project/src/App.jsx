import { useState } from "react"
import Header from "./components/Header"
import InputPanel from "./components/InputPanel"
import Results from "./components/Results"

import {calculateInvestmentResults} from './util/investment';

function App() {
  const [data, setData] = useState();

  function onInputChanged(userInput) {
    console.log('userInput', userInput);
    setData(calculateInvestmentResults(userInput));
  }

  return (
    <>
      <Header />
      <InputPanel onInputChanged={onInputChanged}/>
      <Results data={data}/>
    </>
  )
}

export default App
