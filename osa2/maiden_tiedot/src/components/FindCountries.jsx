const FindCountries = (props) => {
  return (
    <form onSubmit={props.onSearch}>
      find countries: <
        input value={props.searchWord}
        onChange={handleSearchWordChange}
        />
    </form>
  )
}

export default FindCountries
