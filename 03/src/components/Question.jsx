import { useEffect, useRef, useState } from "react";


const answerTime = 4 * 1000;
const reviewTime = 1 * 1000;

const STATE = {
    NOT_ANSWERED: 'NOT_ANSWERED',
    ANSWERED: 'ANSWERED',
    TIMEOUT: 'TIMEOUT'
}

export default function Question({ question, onProcessed }) {
    const [state, setState] = useState();
    const [selectedOption, setSelectedOption] = useState();
    const [remainingTimePercentage, setRemainingAnswerTimePercentage] = useState();

    const interval = useRef();

    useEffect(() => {
        if (state === STATE.NOT_ANSWERED) {
            return setupTimeoutToAnswer();
        } else if (state === STATE.ANSWERED || state === STATE.TIMEOUT) {
            return setupTimeoutToReview();
        }
    }, [state]);

    useEffect(() => {
        setState(STATE.NOT_ANSWERED);
        setSelectedOption(null);
        setRemainingAnswerTimePercentage(100);
    }, [question]);


    function setupTimeoutToAnswer() {
        const endTimestampMs = Date.now() + answerTime;

        interval.current = setInterval(() => {
            const calc = Math.max(0, (endTimestampMs - Date.now()) / answerTime * 100);
            setRemainingAnswerTimePercentage(calc);

            if (calc === 0) {
                setState(STATE.TIMEOUT);
            }
        }, 10);

        return () => {
            clearInterval(interval.current);
        };
    }

    function setupTimeoutToReview() {
        const endTimestampMs = Date.now() + reviewTime;

        interval.current = setInterval(() => {
            const calc = Math.max(0, (endTimestampMs - Date.now()) / reviewTime * 100);
            setRemainingAnswerTimePercentage(calc);

            if (calc === 0) {
                onProcessed(question.id, selectedOption?.id);
            }
        }, 10);

        return () => {
            clearInterval(interval.current);
        };
    }

    function selectOption(option) {
        if (!selectedOption) {
            setSelectedOption(option);
            setState(STATE.ANSWERED);
        }
    }

    const answers = question.options.map(item => {
        let btnClasses = '';
        if (selectedOption?.id === item.id) {
            btnClasses += ' selected ';
            btnClasses += (state === STATE.ANSWERED || state === STATE.TIMEOUT) && selectedOption?.id === question.answerId ? 'correct' : 'wrong';
        }

        return (<li key={item.id} className={'answer '}>
            <button onClick={() => selectOption(item)}
                className={btnClasses}>{item.text}</button>
        </li>)
    });

    return (
        <div id="question" key={question.id}>
            <progress max="100" value={remainingTimePercentage}></progress>
            <h2>{question.question}</h2>

            <ul id="answers">
                {answers}
            </ul>

        </div>
    );
}