const Persons = (props) => {
  return (
    props.persons.filter(person => person.name.toLowerCase().includes(props.filterWord.toLowerCase()))
      .map(person =>
        <p key={person.name}>
          {person.name}
          {' '}
          {person.number}
          {' '}
          <button onClick={props.deletePerson}>{'delete'}</button>
        </p>
        )
  )
}

export default Persons
