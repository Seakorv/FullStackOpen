const PrintOneCountry = (props) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>Capital {props.country.capital}</p>
      <p>Area {props.country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(props.country.languages).map(([short, full], i) =>
          <li key={i}>
            {full}
          </li>
        )}
      </ul>
      <img src={props.country.flags.png} alt={props.country.flags.alt}/>
    </div>
  )
}

export default PrintOneCountry
