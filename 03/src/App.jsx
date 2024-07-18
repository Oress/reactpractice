import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Summary from "./components/Summary";
import QuizContextProvider from "./state/QuizContextProvider";

function App() {
    const [quizFinished, setQuizFinished] = useState(false);

    return (
        <QuizContextProvider>
            <Header />
            {
                quizFinished
                ? <Summary />
                : <Quiz onFinished={() => setQuizFinished(true)}/>
            }

        </QuizContextProvider>
    )
}

export default App;
