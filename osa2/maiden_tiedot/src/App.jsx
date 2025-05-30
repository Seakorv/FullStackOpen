import { useState, useEffect } from 'react'
import PrintCountries from './components/PrintCountries'
import axios from 'axios'

const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [searchWord, setSearchWord] = useState('')
  const [countries, setCountries] = useState({})
  const [oneCountry, setOneCountry] = useState(null)
  const [searchedCountries, setSearchedCountries] = useState({})
  const [buttonPressed, setButtonPressed] = useState(false)
  const [buttonCountry, setButtonCountry] = useState(null)
  const [cityWeather, setCityWeather] = useState(null)
  const [weatherSearched, setWeatherSearched] = useState(false)

  const getAllCountries = () => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
        console.log("Etsitty kaikki maat")
      })
  }

  useEffect(getAllCountries, [])

  const searchOneCountry = () => {
    if (searchedCountries.length === 1) {
      var thisCountry = searchedCountries[0]
      setOneCountry(thisCountry)
      getWeather(thisCountry.capital)
    }
  }

  const getWeather = capital => {
    //Jostain syystä nämä weatherSearched ehdot laittoivat säänhaun toimimaan
    //niin, ettei joka renderillä näy ainakaan konsolissa hakua. Tietäisinpä tarkkaan miksi
    if (!weatherSearched) {
      setWeatherSearched(true)
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then(response => {
          setCityWeather(response.data)
          console.log("Sää haettu")
          console.log(response.data)
          })
    }
  }

  useEffect(searchOneCountry, [searchedCountries, getWeather])

  const buttonSearch = () => {
    if (buttonPressed) {
      //console.log(buttonCountry.capital)
      getWeather(buttonCountry.capital)
      console.log("Jes nappi")
      console.log(buttonCountry.name.common)
      setOneCountry(buttonCountry)
    }
  }

  useEffect(buttonSearch, [buttonPressed, buttonCountry, getWeather])

  const searchCountries = word => {
    var searchCountryArray = []
    if (word) {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].name.common.toLowerCase().includes(word.toLowerCase())) {
          searchCountryArray.push(countries[i])
        }
      }
      console.log("Monta maata:")
      console.log(searchCountryArray.length)
      setSearchedCountries(searchCountryArray)
    }
  }


  const handleSearchWordChange = (event) => {
    const newSearchWord = event.target.value
    setSearchWord(newSearchWord)
    console.log("Hakusana:")
    console.log(event.target.value)
    searchCountries(newSearchWord)
  }


  const onSearch = (event) => {
    console.log("Enter painettu")
    console.log("Hakusana event:")
    console.log(searchWord)
    console.log("Yksi maa:")
    console.log(oneCountry)
    searchCountries()
    event.preventDefault()
    setSearchWord(searchWord)
    setButtonPressed(false)
  }


  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input
          value={searchWord}
          onChange={handleSearchWordChange}
        />
      </form>
      <PrintCountries
        searchedCountries={searchedCountries}
        oneCountry={oneCountry}
        setOneCountry={setOneCountry}
        buttonPressed={buttonPressed}
        cityWeather={cityWeather}
        setButtonPressed={setButtonPressed}
        setButtonCountry={setButtonCountry}
      />
      </div>
  )
}

export default App
