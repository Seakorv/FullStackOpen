import PrintOneCountry from './PrintOneCountry'

const PrintCountries = ({ searchedCountries, oneCountry, buttonPressed, cityWeather, setButtonPressed, setButtonCountry}) => {
  if (oneCountry != null && cityWeather != null &&(searchedCountries.length === 1 || buttonPressed)) {
    console.log("oneCountry != null")
    console.log(buttonPressed)
    return (
      <PrintOneCountry
        country={oneCountry}
        cityWeather={cityWeather}
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
}

export default PrintCountries
