const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were propably born {bornYear()}</p>
    </div>
  );
};

const App = (props) => {
  const nimi = "Pekka";
  const ika = 10;
  const { counter } = props;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
      {counter}
    </div>
  );
};

export default App;
