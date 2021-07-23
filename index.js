const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

const People = require('./models/person')

app.get('/api/persons', (req, res) => {
    People.find({})
        .then(people => {
            res.json(people)
        })
        .catch(error => {
            res.status(400).end()
        })
})

app.get('/api/persons/:id', (req, res) => {
    People.findById(req.params.id)
        .then(person => {
            res.json(person)
        })
        .catch(err => {
            res.status(400).end()
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    People.findById(id)
        .then(person => {
            if (person) {
                console.log(`deleting ${person}`);
                People.findByIdAndRemove(id)
                    .then(result => res.status(204).end())
                    .catch(error => res.status(400).end())
            }
            else {
                res.status(400).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if (!body.name || !body.number) {
        res.status(400).json({ error: `missing name or number` })
    }
    const person = new People({
        name: body.name,
        number: body.number
    })
    person.save()
        .then(result => res.json(result))
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    let date = new Date()
    People.count({}).then(amount => {
        res.send(`
        <p>Phonebook has info for ${amount} people</p>
        <p>${date}</p>`)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    next(error)
}

app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`CORS enabled for all origins`);
    console.log(`listening on PORT: ${port}`);
})