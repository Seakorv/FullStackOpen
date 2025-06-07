import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    console.log("delete painettu jes")
    console.log(id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteMe(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setIsError(false)
        })
        .catch(error => {
          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setIsError(true)
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
        const changedPerson = { ...thisPerson, number: newNumber }
        personService
          .update(thisPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== thisPerson.id ? person : returnedPerson))
            setNotificationMessage(
              `Changed the number of ${personObject.name} to ${changedPerson.number}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setIsError(false)
          })
          .catch(error => {
            setNotificationMessage(
              `Information of ${personObject.name} has already been removed from server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setIsError(true)
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
        setNotificationMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
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
      <Notification message={notificationMessage} isError={isError}/>

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
