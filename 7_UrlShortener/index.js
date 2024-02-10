const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const URL = require("./models/Url");
const port = 3000;
const { connectMongoDB } = require("./connect");

//connection
connectMongoDB("mongodb://0.0.0.0:27017/short-url").then(() => {
  return console.log("MongoDB connected");
});

//middleware
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
