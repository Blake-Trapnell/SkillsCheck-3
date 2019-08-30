require ('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require("./Controllers/authController.js")
const postCtrl = require('./Controllers/postsController.js')
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
app.get('/api/posts', postCtrl.getPosts)
app.post('/api/posts', postCtrl.post)
app.get('/api/auth/me', authCtrl.getMe)
app.delete('auth/logout', authCtrl.logout)
massive(CONNECTION_STRING).then(db=> {
    app.set('db',db)
    app.listen(PORT, () => console.log(`^.^ welcome to ${PORT}`))
})
