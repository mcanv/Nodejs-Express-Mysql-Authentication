const bcrypt = require('bcryptjs')
const db = require('../lib/database')

login = (req, res) => { 
  res.render('auth/login')
}

loginPost = (req, res) => {
  const { email, password } = req.body

  db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result.length > 0) {
        const user = result[0]
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = user
          res.redirect('/auth/profile')
        } else {
          res.send('Wrong password')
        }
      } else {
        res.send('User not found')
      }
    }
  })
}

register = (req, res) => {
  res.render('auth/register')
}

registerPost = (req, res) => { 
  const {username, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)

  db.query(`SELECT * FROM users WHERE email = ? OR username = ?`, [email, username],  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result.length > 0) {
        res.send('User already exists')
      } else {
        db.query(`INSERT INTO users(username, email, password) VALUES(?, ?, ?)`, [username, email, hashedPassword],  (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.redirect('/auth/login')
          }
        })
      }
    }
  })
}

profile = (req, res) => {
  res.render('auth/profile')
}

logout = (req, res) => {
  req.session = null
  res.redirect('/auth/login')
}

module.exports = {
  login,
  loginPost,
  register,
  registerPost,
  profile,
  logout
}