const Persons = (props) => {
  const filterWord = (props.filterWord ?? '').toLowerCase();

  return (
    props.persons.filter(person => (person.name ?? '').toLowerCase().includes(filterWord))
      .map(person =>
        <p key={person.name}>
          {person.name}
          {' '}
          {person.number}
          {' '}
          <button onClick={() => props.deletePerson(person.id)}>{'delete'}</button>
        </p>
        )
  )
}

export default Persons
