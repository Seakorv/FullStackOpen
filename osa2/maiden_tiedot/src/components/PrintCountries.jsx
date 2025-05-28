const PrintCountries = (props) => {
  //console.log(props.searchedCountries)
  if (props.searchedCountries.length > 1 && props.searchedCountries.length <= 10) {
    return (
      props.searchedCountries.map(country =>
        <p key={country.name.common}>
          {country.name.common}
        </p>
      )
    )
  }
  else if (props.searchedCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (props.searchedCountries.length === 1 && props.oneCountry != null) {
    console.log("Tulostamassa...")
    console.log(props.oneCountry)
    var country = props.oneCountry
    console.log(country)
    console.log(country.languages.fin)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([short, full], i) =>
            <li key={i}>
              {full}
            </li>
          )}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>
      </div>
    )
  }
}


//<pre>{JSON.stringify(props.searchedCountries, null, 2)}</pre>

export default PrintCountries
