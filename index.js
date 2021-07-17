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