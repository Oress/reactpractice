import { useContext, useEffect, useState } from 'react';
import Question from './Question';
import { QuizContext } from '../state/QuizContextProvider';

export default function Quiz({onFinished}) {
    const quizCtx = useContext(QuizContext);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    let question;
    if (quizCtx.questions.length <= currentQuestion) {
        onFinished();
    } else {
        question = quizCtx.questions[currentQuestion];
    }

    return (
        <div id="quiz">
            <Question question={question} />
        </div>
    )
}