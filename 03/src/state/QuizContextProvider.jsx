import { createContext, useContext, useReducer, useState } from "react"
import data from '../data';

const defaultValue = {
    questions: data,
    userAnswers: [], // {questionId: 1, userAnswerId: 2}
    stats: {
        skippedPercentage: 0,
        correctPercentage: 0,
        incorrectPercentage: 0,
    },
    addAnswer: (questionId, answerId) => {},
    calculateStatistics: () => {}
};

export const QuizContext = createContext(defaultValue);


function quizReducer(oldState, action) {
    if (action.type === 'ADD_ANSWER') {
        return {
            ...oldState,
            userAnswers: [...oldState.userAnswers, action.answer]
        }
    }
}

export default function QuizContextProvider({children}) {
    const [quizState, dispatchAction] = useReducer(quizReducer, defaultValue);

    const ctxValue = {
        ...quizState,
        addAnswer: (questionId, answerId) => {dispatchAction({type: "ADD_ANSWER", answer: {questionId, answerId}})},
    }
    return (
        <QuizContext.Provider value={ctxValue}>
            {children}
        </QuizContext.Provider>
    )
}