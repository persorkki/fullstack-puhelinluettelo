const express = require('express')
const app = express()

phoneNumbers = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
]

const baseUrl = 'http://localhost:3001/api/persons'

app.get('/api/persons', (req, res) => {
    res.json(phoneNumbers)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const number = phoneNumbers.find(pn => pn.id === id)
    if (!number)
    {
        res.status(400).end()
    }
    else {
        res.json(number)
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (phoneNumbers.find(pn => pn.id === id)) {
        phoneNumbers = phoneNumbers.filter(n => n.id !== id)
        console.log(`deleted id ${id}`)
        res.status(204).end()
    }
    else {
        res.status(400).end()
    }
})

app.get('/info', (req, res) => {
    let date = new Date()
    const info = `
    <p>Phonebook has info for ${phoneNumbers.length} people</p>
    <p>${date}</p>`
    res.send(info)
}) 

const port = 3001
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})