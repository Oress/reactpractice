import { useEffect } from "react";


export default function Question({ question }) {
    const progress = 100;

    useEffect(() => {
        const interval = setInterval(, 10);


        return () => {
            ca
        }
    }, []);


    return (
        <div id="question">
            <progress>{progress}</progress>
            <h2>{question.question}</h2>

            <ul id="answers">
                {question.options.map(item =>
                    <li key={item.id} className="answer">
                        <button>{item.text}</button>
                    </li>)}
            </ul>

        </div>
    );
}