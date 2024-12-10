import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    console.log("delete painettu")

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteMe(id)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }
    console.log(`${personObject.name} is the name`)

    if (persons.map(person => person.name).includes(personObject.name)) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const thisPerson = persons.find(p => p.name === personObject.name)
        const changedPerson = {...thisPerson, number: newNumber}
        personService
          .update(thisPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== thisPerson.id ? person : returnedPerson))
            })
          .catch(error => {
            alert(
              "Problems with editing number. Nothing will be changed."
            )
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }

    //setPersons(persons.concat(personObject))
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filterWord={filterWord}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterWord={filterWord}
        deletePerson={deletePerson}
      />

    </div>
  )

}

export default App
