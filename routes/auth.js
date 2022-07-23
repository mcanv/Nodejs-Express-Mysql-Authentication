const router = require("express").Router()
const { login, loginPost, register, registerPost, profile, logout } = require("../controllers/authController")
const { checkLogged, checkNotLogged } = require("../middlewares/authMiddleware")

router.route("/login").get(checkNotLogged, login).post(checkNotLogged, loginPost)
router.route("/register").get(checkNotLogged, register).post(checkNotLogged, registerPost)
router.get('/profile', checkLogged, profile)
router.get('/logout', logout)

module.exports = router