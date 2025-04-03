import { useState, useEffect } from 'react'
import countryService from './services/countries'
import FindCountries from './components/FindCountries'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [searchWord, setSearchWord] = useState('')
  const [countries, setCountries] = useState({})

  /*Pohtimisa tulevaisuuteen

    Pitää hakea listaan maita "includes" tyylillä. Eli tehdä .get
    useasti koko API:n läpi. Toimii varmasti parhaiten api/names/${}
    tyylillä.
    Ei pakolla toimikaan, koska api:sta voi hakea vain tarkat nimet.
    eli api/all johonkin muuttujaan, etsitään sieltä juttuja.
    sitten kun on vaan yksi jäljellä, voisi tehdä api/name:n

    Nyt siis pitäisi parsea api/all countries sillein, että siitä voisi hakea nimellä
    asioita.

    ehkä käytä sittenkin getAll ensiksi johonkin ja käsittele sitä tiedostoa sitten
  */


  useEffect(() => {
    console.log('Hakusana on: ' + searchWord)
    if (searchWord) {
      console.log("moi")
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
          console.log(response.data)
        })
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
      <pre>
        {JSON.stringify(countries, null, 2)}
      </pre>
    </div>
  )
}

export default App
