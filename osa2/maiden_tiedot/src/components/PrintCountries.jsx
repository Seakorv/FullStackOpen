import PrintOneCountry from './PrintOneCountry'

const PrintCountries = (props) => {
  var oneCountry = null
  var searchSpecificCountry = false
  //console.log(props.searchedCountries)
  if (props.searchedCountries.length > 1 && props.searchedCountries.length <= 10) {
    return (
      props.searchedCountries.map(country =>
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={() =>
            {
              console.log("moi");
              <PrintOneCountry
                country={country}>
              </PrintOneCountry>}
            }>
            show
          </button>
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
    oneCountry = props.oneCountry
    return (
      <PrintOneCountry
        country={oneCountry}
      />
    )
  }
}


//<pre>{JSON.stringify(props.searchedCountries, null, 2)}</pre>

export default PrintCountries
