const checkLogged = (req, res, next) => {
  const user = req.session.user
  if (user) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

const checkNotLogged = (req, res, next) => {
  const user = req.session.user
  if (!user) {
    next()
  } else {
    res.redirect('/auth/profile')
  }
}

module.exports = {
  checkLogged,
  checkNotLogged,
}