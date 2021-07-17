const express = require('express')
const app = express()

app.use(express.json())

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

/*  generoidaan satunnainen ID ja katsotaan löytyykö se jo phonebookista
    jos löytyy, niin tehdään uusia kunnes löytyy sellainen joka ei ole käytössä
    ja kyllä, jää jumiin jos kaikki numerot viety*/
const getRandomId = () => {
    let id = 0
    do {
        id = Math.floor(Math.random() * 100000)
    } while (phoneNumbers.find(pn => pn.id === id))
    return id
}


app.post('/api/persons/', (req, res) => {
    const body = req.body

    //lähetetään virhe jos nimi tai numero puuttuu
    if (!body.name || !body.number) {
        res.status(400).json({error:`missing name or number`})
    }
    else {
        //jos annettua nimeä ei löydy puhelinluettelosta, voidaan lisätä se listaan
        if (!phoneNumbers.find(pn => pn.name === body.name)) {
            const newObj = {
                id: getRandomId(),
                name: body.name,
                number: body.number,
            }
            phoneNumbers = phoneNumbers.concat(newObj)
            res.json(newObj)
        }
        else {
            //ja jos nimi löytyi jo puhelinluettelosta, annetaan virhe
            res.status(400).json({error:`name is already in the phonebook`})
        }
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