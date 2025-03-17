require('dotenv').config()
const express = require("express")
const cors = require("cors")
const URL = require("./models/url")
const app = express()
const { ConnectToDB } = require('./connect')
const router = require('./routes/url')
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


ConnectToDB()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/url',router)

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
