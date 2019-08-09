require ('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
const PORT = SERVER_PORT || 4311

const app = express()

app.use(express.json())

massive(CONNECTION_STRING).then(db=> {
    app.set('db',db)
    app.listen(PORT, () => console.log(`^.^ welcome to ${PORT}`))
})
