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
            console.log(people);
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
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        res.status(400).json({error:`missing name or number`})
    }
    const person = new People({
        name: body.name,
        number: body.number
    })
    person.save().then(p => {
        res.json(p)
    })
    /*
    People.find({ name: body.name })
        .then(dude => console.log(dude.name) )
        .catch(err => {
            const person = new People({
                name: body.name,
                number: body.number
            })
            person.save().then(p => console.log(`saved object`))

        })
    */
})
/*
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
*/

app.get('/info', (req, res) => {
    let date = new Date()
    People.count({}).then(amount => {
        res.send(`
        <p>Phonebook has info for ${amount} people</p>
        <p>${date}</p>`)
    })
}) 

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`CORS enabled for all origins`);
    console.log(`listening on PORT: ${port}`);
})