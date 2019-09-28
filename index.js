const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const port = process.env.PORT || 3000
app.listen(port, function() {
  console.log(`Listening on port ${port}...`)
})

const animals = [
  { id: 1, name: 'lion'},
  { id: 2, name: 'leopard'},
  { id: 3, name: 'kangaroo'}
]

app.get('/', function(req, res) {
  res.send('Welcome to my animals API')
})

app.get('/api/animals', function(req, res) {
  res.send(animals);
})

app.get('/api/animals/:id', function(req, res) {
  const animal = animals.find(a => a.id === parseInt(req.params.id))
  if (!animal) return res.status(404).send('Animal not found')
  res.send(animal)
})

app.post('/api/animals', function(req, res) {
  const { error } = validateAnimal(req.body)
  if (error) return res.status(400).send(error.details)

  const animal = {
    id: animals.length + 1,
    name: req.body.name
  }
  animals.push(animal)
  res.send(animal)
})

app.put('/api/animals/:id', function(req, res) {
  const animal = animals.find(a => a.id === parseInt(req.params.id))
  if (!animal) return res.status(404).send('Animal not found')

  const { error } = validateAnimal(req.body)
  if (error) return res.status(400).send(error.details)

  animal.name = req.body.name;
  res.send(animal)
})

app.delete('/api/animals/:id', function(req, res) {
  const animal = animals.find(a => a.id === parseInt(req.params.id))
  if (!animal) return res.status(404).send('Animal not found')

  const index = animals.indexOf(animal)
  animals.splice(index, 1)

  res.send(animal)
})

function validateAnimal(animal) {
  const schema = {
    name: Joi.string().min(1).required()
  }
  return Joi.validate(animal, schema)
}

	test indentation fix
	test 2
