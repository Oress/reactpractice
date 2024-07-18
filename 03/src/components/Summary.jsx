import img from '../assets/quiz-complete.png';

export default function Summary() {

    const answers = [
        {
            id: 1,
            question: "bshagoh[ahg",
            answer: "gpjqg09j3j",
            isCorrect: true
        },
        {
            id: 2,
            question: "bshagoh[ahg",
            answer: "gpjqg09j3j",
            isCorrect: false
        }
    ];

    return (
        <div id="summary">
            <img src={img} />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">0%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">0%</span>
                    <span className="text">Answered correctly</span>
                </p>
                <p>
                    <span className="number">0%</span>
                    <span className="text">Answered incorrectly</span>
                </p>
            </div>
            <ol>
                {
                    answers.map((item, index) => <li key={item.id} className="question">
                        <h3>{index+1}</h3>
                        <p className="user-answer">{item.question}</p>
                        <p className={'user-answer ' + (item.isCorrect ? 'correct' : 'wrong')}>{item.answer}</p>
                    </li>)
                }
            </ol>
        </div>
    );
}