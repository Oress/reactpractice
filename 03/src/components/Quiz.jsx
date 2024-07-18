import { useContext } from 'react';
import Question from './Question';
import { QuizContext } from '../state/QuizContextProvider';

export default function Quiz() {
    const quizCtx = useContext(QuizContext);

    let question = quizCtx.questions[quizCtx.currentQuestionIndex];

    function goToTheNextQuestion(questionId, answerId) {
        quizCtx.addAnswer(questionId, answerId);
        quizCtx.goToTheNextQuestion();
    }

    return (
        <div id="quiz">
            {question && <Question question={question} onProcessed={goToTheNextQuestion} />}
        </div>
    )
}