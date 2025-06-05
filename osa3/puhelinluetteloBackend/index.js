require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

let persons = []

morgan.token('postContent', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postContent'))
app.use(express.static('dist'))
app.use(express.json())

/*const generateId = () => {
  const min = 5;
  const max = 6942069420;
  return Math.floor(Math.random() * (max - min) + min);
}*/

app.get('/', (request, response) => {
  response.send('<h1>Puhelinluettelo</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(
    `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  if (persons.map(person => person.name).includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
