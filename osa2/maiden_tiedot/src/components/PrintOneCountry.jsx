const PrintOneCountry = ({ country, cityWeather }) => {
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
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {(cityWeather.main.temp - 273.15).toFixed(2)} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt={cityWeather.weather[0].description}/>
      <p>Wind {cityWeather.wind.speed} m/s</p>
    </div>
  )
}

export default PrintOneCountry
