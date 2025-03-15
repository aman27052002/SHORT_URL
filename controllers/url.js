const shortId = require('shortid')
const URL = require('../models/url')
async function handleGenerateShortId(req, res){
    try {
        const url = req.body.url
        const shortID = shortId()
        if (!url) return res.status(400).json({ error: 'url not found' })

        await URL.create({
            shortId: shortID,
            redirectUrl: url,
            visitHistory: [],
            createdBy:req.user._id
        })
        return res.status(201).json({ message: 'url created successfully', shortID })
    } catch (error) {
        return res.status(500).json({ error: 'error occured while generating short id' })
    }
}
async function handleAnalytics(req, res){
    try {
        const shortId = req.params.shortId
        if (!shortId) return res.status(400).json({ error: 'shortId not found' })
        const entry = await URL.findOne({ shortId })
        if (!entry) return res.status(400).json({ error: 'shortId not found' })
        return res.status(200).json({ visitHistory: entry.visitHistory })
    } catch (error) {
        return res.status(500).json({ error: 'error occured while fetching analytics' })
    }
}

module.exports = { handleGenerateShortId ,handleAnalytics } 