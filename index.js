require('dotenv').config()
const express = require("express")
const cors = require("cors")
const URL = require("./models/url")
const app = express()
const { ConnectToDB } = require('./connect')
const router = require('./routes/url')
const userRouter = require('./routes/user')
const cookieParser = require('cookie-parser')
const { restrictToLoggedInUserOnly } = require('./middleware/auth')
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: "https://short-url-omega-eight.vercel.app/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


ConnectToDB()
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/url',restrictToLoggedInUserOnly,router)
app.use('/user',userRouter)

app.get('/', (req, res) => {
  return res.send("hello from server")
})

app.get('/:shortId', async (req, res) => {
  try {
    const shortId = req.params.shortId
    if (!shortId) return res.status(400).json({ error: "shortId not found" })
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { Timestamp: Date.now() } } },
      { new: true },
    )
    if (!entry) return res.status(400).json({ error: "shortId not found " })
    return res.redirect(entry.redirectUrl)
  } catch (error) {
    return res.status(500).json({ error: 'error occured while generating short id' })
  }
})

app.listen(PORT, () => console.log(`server listening to the port : ${PORT}`))
