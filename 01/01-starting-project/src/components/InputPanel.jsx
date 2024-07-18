import { useState } from "react"

export default function InputPanel({onInputChanged}) {
    const [initialInvestment, setInitInvestment] = useState(15000);
    const [annualInvestment, setAnualInvestment] = useState(900);
    const [expectedReturn, setExpReturn] = useState(5.5);
    const [duration, setDuration] = useState(10);

    function update(initialInvestment, annualInvestment, expectedReturn, duration) {
        onInputChanged({
            initialInvestment: Number.parseInt(initialInvestment),
            annualInvestment: Number.parseInt(annualInvestment),
            expectedReturn: Number.parseFloat(expectedReturn),
            duration: Number.parseInt(duration)
         });
    }

    return <>
        <section id="user-input">
            <div className="input-group">
                <div>
                    <label>Initial investment</label>
                    <input value={initialInvestment} onChange={(event) => {
                        setInitInvestment(event.target.value); 
                        update(event.target.value, annualInvestment, expectedReturn, duration);
                        }} type="number" />
                </div>
                <div>
                    <label>Annual investment</label>
                    <input value={annualInvestment} onChange={(event) => {
                        setAnualInvestment(event.target.value); 
                        update(initialInvestment, event.target.value, expectedReturn, duration);
                        }} type="number" />
                </div>
            </div>
            <div className="input-group">
                <div>
                    <label>Expected Return</label>
                    <input value={expectedReturn} onChange={(event) => {
                        setExpReturn(event.target.value); 
                        update(initialInvestment, annualInvestment, event.target.value, duration);
                        }} type="number" />
                </div>
                <div>
                    <label>Duration</label>
                    <input value={duration} onChange={(event) => {
                        setDuration(event.target.value); 
                        update(initialInvestment, annualInvestment, expectedReturn, event.target.value);
                        }} type="number" />
                </div>
            </div>
        </section>
    </>


}