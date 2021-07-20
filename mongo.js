const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("wrong number of arguments");
    process.exit()
}
const password = process.argv[2]

const url =
    `mongodb+srv://garamool:${password}@cluster0.iktaj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
    Person.find({}).then(persons => {
        console.log(`phonebook:`)
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        process.exit()
    })
}

else if (process.argv.length >= 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(res => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
        mongoose.connection.close()
    })
}