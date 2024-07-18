
import {formatter} from '../util/investment';

export default function Results({data=[]}) {

    console.log(data);

    let sum = 0;
    const totalInterestPerYear = data.map(item => {
        const prevSum = sum;
        sum += item.interest;
        return prevSum + item.interest;
    });
    return <>
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Vaue</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return <tr key={item.year}>
                        <td>{item.year}</td>
                        <td>{formatter.format(item.valueEndOfYear)}</td>
                        <td>{formatter.format(item.interest)}</td>
                        <td>{formatter.format(totalInterestPerYear[index])}</td>
                        <td>{formatter.format(item.valueEndOfYear)}</td>
                    </tr>
                })}
            </tbody>
        </table>
    
    </>


}