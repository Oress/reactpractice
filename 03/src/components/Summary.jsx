import img from '../assets/quiz-complete.png';
import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../state/QuizContextProvider';


export default function Summary() {
    const quizCtx = useContext(QuizContext);

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const answerModels = quizCtx.userAnswers.map(answ => {
            const originalQuestion = quizCtx.questions.find(q => q.id === answ.questionId);
            if (originalQuestion) {
                return {
                    question: originalQuestion.question,
                    answer: answ.answerId ? originalQuestion.options.find(o => o.id === answ.answerId).text : "SKIPPED",
                    isCorrect: originalQuestion.answerId === answ.answerId
                };
            } else {
                throw Error("Question not found");
            }
        });
        setAnswers(answerModels);
    }, [])
    

    return (
        <div id="summary">
            <img src={img} />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{quizCtx.stats?.skippedPercentage}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{quizCtx.stats?.correctPercentage}%</span>
                    <span className="text">Answered correctly</span>
                </p>
                <p>
                    <span className="number">{quizCtx.stats?.incorrectPercentage}%</span>
                    <span className="text">Answered incorrectly</span>
                </p>
            </div>
            <ol>
                {
                    answers.map((item, index) => <li key={index} className="question">
                        <h3>{index+1}</h3>
                        <p className="user-answer">{item.question}</p>
                        <p className={'user-answer ' + (item.isCorrect ? 'correct' : 'wrong')}>{item.answer}</p>
                    </li>)
                }
            </ol>
        </div>
    );
}