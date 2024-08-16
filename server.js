const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db,
dbConnectionStr = process.env.DB_STRING,
dbName = 'Golf-Club'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true}))
    app.use(express.json())

    app.get('/', async(request, response) => {
        const golfClub = await db.collection('Golf-Club').find().toArray()
        const clubsAdded = await db.collection('Golf-Club').countDocuments({clubAdded: true})
        response.render('index.ejs', {club: golfClub, added: clubsAdded })
        
        })

        app.post('/addClub', (request, response) => {
            console.log(request.body)
            db.collection('Golf-Club').insertOne({clubLength: request.body.golfClub, clubAdded: true})
            .then(result => {
                console.log('Club Added')
                response.redirect('/')
            })
            .catch(error => console.error(error))
        })


        app.delete('/deleteClub', (request, response) => {
            console.log(request)
            db.collection('Golf-Club').deleteOne({clubLength: request.body.itemFromJS})
            .then(result => {
                console.log('Club Deleted')
                response.json('Club Deleted')
            })
        })




    app.listen(process.env.PORT || PORT, () =>{
        console.log(`Server is running on port ${PORT}`)
    })