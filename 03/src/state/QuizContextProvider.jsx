import { createContext, useContext, useEffect, useReducer, useState } from "react"
import data from '../data';

const defaultValue = {
    questions: data,
    userAnswers: [], // {questionId: 1, userAnswerId: 2}
    currentQuestionIndex: 0,
    quizFinished: false,
    stats: null,
    addAnswer: (questionId, answerId) => {},
    goToTheNextQuestion: () => {},
    calculateStatistics: () => {}
};

export const QuizContext = createContext(defaultValue);


function quizReducer(oldState, action) {
    if (action.type === 'ADD_ANSWER') {
        return {
            ...oldState,
            userAnswers: [...oldState.userAnswers, action.answer]
        }
    } else if (action.type === 'GO_TO_NEXT_QUESTION') {
        const newQuestionIndex = oldState.currentQuestionIndex + 1;
        let quizFinished = oldState.questions.length <= newQuestionIndex;
        return {
            ...oldState,
            quizFinished: quizFinished,
            currentQuestionIndex: newQuestionIndex
        };
    } else if (action.type === 'SET_STATS') {
        const newQuestionIndex = oldState.currentQuestionIndex + 1;
        let quizFinished = oldState.questions.length <= newQuestionIndex;
        return {
            ...oldState,
            stats: action.stats,
        };
    }
}

export default function QuizContextProvider({children}) {
    const [quizState, dispatchAction] = useReducer(quizReducer, defaultValue);

    const ctxValue = {
        ...quizState,
        addAnswer: (questionId, answerId) => {dispatchAction({type: "ADD_ANSWER", answer: {questionId, answerId}})},
        goToTheNextQuestion: () => {
            dispatchAction({type: "GO_TO_NEXT_QUESTION"});
        },
    }

    useEffect(() => {
        if (quizState.quizFinished && !quizState.stats) {
            const totalQuestions = quizState.questions.length;
            let correctCount = 0;
            let skippedCount = 0;

            quizState.userAnswers.forEach(answ => {
                const originalAnswer = quizState.questions.find(q => q.id === answ.questionId);
                if (originalAnswer) {
                    if (!answ.answerId) {
                        skippedCount++;
                    } else if (originalAnswer.answerId === answ.answerId) {
                        correctCount++;
                    }
                } else {
                    throw Error("Question not found");
                }
            });
            const correctPercentage = Number.parseInt((correctCount / totalQuestions) * 100);
            const skippedPercentage = Number.parseInt((skippedCount / totalQuestions) * 100);
            const stats = {
                correctPercentage,
                skippedPercentage,
                incorrectPercentage: 100 - correctPercentage - skippedPercentage
            };
            dispatchAction({type: "SET_STATS", stats})
        }
    }, [quizState])

    return (
        <QuizContext.Provider value={ctxValue}>
            {children}
        </QuizContext.Provider>
    )
}