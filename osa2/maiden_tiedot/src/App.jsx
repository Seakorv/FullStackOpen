import { useState, useEffect } from 'react'
import countryService from './services/countries'
import PrintCountries from './components/PrintCountries'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [searchWord, setSearchWord] = useState('')
  const [countries, setCountries] = useState({})
  const [searchedCountries, setSearchedCountries] = useState({})


  useEffect(() => {
    console.log('Hakusana on: ' + searchWord)
    var searchCountryArray = []

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
        //setSearchedCountries(response.data)
        //console.log(countries.length + " clength")
      })

    if (searchWord) {

      for (let i = 0; i < countries.length; i++) {
        //console.log("loopissa")
        //console.log(countries[i].name.common)
        if (countries[i].name.common.toLowerCase().includes(searchWord.toLowerCase())) {
          searchCountryArray.push(countries[i])
          /*if (searchCountryArray.length > 10) {
            break
          }*/
        }
      }
      //Jos yli 10, Pois
      setSearchedCountries(searchCountryArray)
      console.log(searchedCountries)
      console.log("Countries length: " + searchedCountries.length)
    }
  }, [searchWord])

  //en tiiä tarviiko, ei ainakaan vielä riko mitään
  if (!countries) {
    return null
  }


  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value)
  }


  const onSearch = (event) => {
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
      />
      </div>
  )
}

export default App
