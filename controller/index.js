const shortid = require("shortid");
const URL = require("../model/index");

async function handleGenerateShortUrl(req, res) {
    const { url } = req.body; 
    
    if (!url) return res.status(400).json({ error: "URL is required" });

    let formattedurl = url;
    if (!/^https?:\/\//i.test(url)) {
        formattedurl = `http://${url}`;
    }

    const shortId = shortid(); // Generates a unique short ID

    await URL.create({
        shortId: shortId,
        redirectURL: formattedurl,
        visitHistory: [],
    });

    return res.redirect("/");

}
async function handleGetShortUrl(req, res) {
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId: req.params.Id },
            { $push: { visitHistory: { timestamp: Date.now() } } }, // Corrected syntax
            { new: true }
        );

        if (!entry) {
            return res.status(404).send("URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}



module.exports = { handleGenerateShortUrl ,handleGetShortUrl};
