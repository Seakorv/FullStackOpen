const PrintCountries = (props) => {
  console.log(props.searchedCountries)
  if (props.searchedCountries.length > 0 && props.searchedCountries.length <= 10) {
    return (
      props.searchedCountries.map(country =>
        <pre key={country.name.common}>
          {country.name.common}
        </pre>
      )
    )
  }

}


//<pre>{JSON.stringify(props.searchedCountries, null, 2)}</pre>

export default PrintCountries
