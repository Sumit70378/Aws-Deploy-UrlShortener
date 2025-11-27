const express = require("express");
const { connectMongodb } = require("./Connection");
const urlRoute = require("./routes/index")
const URL = require("./model/index")

connectMongodb("mongodb+srv://sumitrawat2714_db_user:je7pfElP3qU504Mv@cluster0.vr2ltaw.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Mongodb Connected..")
}).catch(() => {
    console.log("Mongodb Not Connected..")
})
const app = express();
app.set("view engine", "ejs"); //setting up ejs
app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.use("/url", urlRoute);

app.get("/", async (req, res) => {
    try {
      const urls = await URL.find(); // Fetch all items from MongoDB
      res.render("home", { urls }); // Pass data to EJS template
    } catch (err) {
      res.status(500).send("Error fetching data");
    }
  });
  

  app.delete('/:shortId', async(req,res)=>{
    const { shortId } = req.params;
    const deletedUrl = await URL.findOneAndDelete({ shortId });
    res.json({ success: true, message: "URL deleted successfully" });
  })

app.get('/:Id', async (req, res) => {
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
});



const Port = 8080;

app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});
