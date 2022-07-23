const express = require("express")
const app = express()
const cookieSession = require("cookie-session")
require("dotenv").config()
const PORT = process.env.PORT || 3000
const authRoutes = require("./routes/auth")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cookieSession({
    name: "user",
    keys: [process.env.SESS_SECRET],
    maxAge: 24 * 60 * 60 * 1000
  })
)
app.set("view engine", "ejs")

app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})

app.get("/", (req, res) => {
  res.send("Hello World!")
})
app.use("/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})