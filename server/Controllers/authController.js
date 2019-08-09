const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req,res) => {
        console.log('hit')
        const db = req.app.get('db')
        const {username, password, profileimg} = req.body

        const user = await db.find_username([username])
        if (user.length > 0) {
            return res.status(400).send({ message: 'username in use'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.insert_user_info({username, profileimg})
        db.insert_hash({ hash, user_id: newUser[0].user_id })
        .then(() => {
            const loggedinUser = newUser[0]
          res
            .status(200)
            .send({
                message: 'Logged in',
                user: loggedinUser,
                loggedIn: true
              })
        })
        
        // .catch(err => {
        //   res.status(500).send({message: 'Failed to register'})
        // })
    },
    login: async (req, res) => {
        console.log(req.session)
        const db = req.app.get('db')
        const {username, password} = req.body
        const user = await db.find_username_and_hash([username])
        if (user.length === 0) {
          return res.status(400).send({message: 'username not found'})
        }
        const result = bcrypt.compareSync(password, user[0].hash)
            const loggedInUser = user[0]
            console.log(loggedInUser)
        if (result) {
          delete loggedInUser.hash
          req.session.user = loggedInUser
          return res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true})
        }
      },
      logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({message: 'Logged out', loggedIn: false})
      }
}