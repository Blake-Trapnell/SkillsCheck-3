require ('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require("./Controllers/authController.js")
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
const PORT = SERVER_PORT || 4311

const app = express()
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10
    }
  }))
  

app.use(express.json())

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)

massive(CONNECTION_STRING).then(db=> {
    app.set('db',db)
    app.listen(PORT, () => console.log(`^.^ welcome to ${PORT}`))
})
