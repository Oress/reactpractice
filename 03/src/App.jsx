import { useState, useContext, useEffect } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Summary from "./components/Summary";
import QuizContextProvider from "./state/QuizContextProvider";
import {QuizContext} from "./state/QuizContextProvider";

function App() {
    const quizCtx = useContext(QuizContext);

    return (
        <>
            <Header />
            {
                quizCtx.quizFinished
                ? <Summary />
                : <Quiz/>
            }
        </>
    )
}

export default App;
