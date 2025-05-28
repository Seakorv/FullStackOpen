import { useState, useEffect } from 'react'
import countryService from './services/countries'
import PrintCountries from './components/PrintCountries'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [searchWord, setSearchWord] = useState('')
  const [countries, setCountries] = useState({})
  const [oneCountry, setOneCountry] = useState(null)
  const [searchedCountries, setSearchedCountries] = useState({})

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
      var searchOneCountry = searchedCountries[0].name.common.toLowerCase()
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${searchOneCountry}`)
        .then(response => {
          setOneCountry(response.data)
          console.log("Yksi maa: ")
          console.log(response.data)
        })
    }
  }

  useEffect(searchOneCountry, [searchedCountries])

  const searchCountries = () => {
    var searchCountryArray = []
    if (searchWord) {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].name.common.toLowerCase().includes(searchWord.toLowerCase())) {
          searchCountryArray.push(countries[i])
        }
      }
      console.log("Monta maata:")
      console.log(searchCountryArray.length)
      setSearchedCountries(searchCountryArray)
    }
  }


  //en tiiä tarviiko, ei ainakaan vielä riko mitään
  if (!countries) {
    return null
  }


  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value)
    console.log("Hakusana:")
    console.log(event.target.value)
    //searchCountries()
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
        //oneCountry={oneCountry}
      />
      </div>
  )
}

export default App
