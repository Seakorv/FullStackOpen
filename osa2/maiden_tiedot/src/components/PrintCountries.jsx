import PrintOneCountry from './PrintOneCountry'

const PrintCountries = ({ searchedCountries, oneCountry, buttonPressed, setButtonPressed, setButtonCountry, setOneCountry }) => {
  if (oneCountry != null && (searchedCountries.length === 1 || buttonPressed)) {
    console.log("oneCountry != null")
    console.log(buttonPressed)
    //setButtonPressed(false)
    return (
      <PrintOneCountry
        country={oneCountry}
      />
    )
  }
  console.log("Onko nappi painettu?")
  console.log(buttonPressed)
  if (searchedCountries.length > 1 && searchedCountries.length <= 10) {
    return (
      searchedCountries.map(country =>
        <p key={country.name.common}>
          {country.name.common + " "}
          <button onClick={() => {
            setButtonPressed(true);
            setButtonCountry(country);
          }}>
            show
          </button>
        </p>
      )
    )
  }
  else if (searchedCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  /*else if (searchedCountries.length === 1 && oneCountry != null) {
    return (
      <PrintOneCountry
        country={oneCountry}
      />
    )
    }*/
}


//<pre>{JSON.stringify(props.searchedCountries, null, 2)}</pre>

export default PrintCountries
