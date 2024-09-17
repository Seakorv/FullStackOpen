import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);


const StatisticLine= ({ text, value, textTwo }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
    <td>{textTwo}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (good != 0 || neutral != 0 || bad != 0)
    {
      return(
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} textTwo="%"/>
          </tbody>
        </table>
      )
    }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood)
    setAll(updatedAll)
    if (updatedAll != 0) {
      setAverage((updatedGood - bad) / updatedAll)
      setPositive((updatedGood / updatedAll) * 100)
    }
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    if (updatedAll != 0) {
      setAverage((good - bad) / updatedAll)
      setPositive((good / updatedAll) * 100)
    }
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1
    setBad(updatedBad)
    setAll(updatedAll)
    if (updatedAll != 0) {
      setAverage((good - updatedBad) / updatedAll)
      setPositive((good / updatedAll) * 100)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}
        all={all} average={average} positive={positive} />
    </div>
  )
};

export default App;
