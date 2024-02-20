const express = require("express");
const app = express();

const { restrictToLoggedUserOnly, checkAuth } = require("./middlewares/auth");

//routeREgister
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

const URL = require("./models/Url");
const port = 3000;
const path = require("path");
const { connectMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");

//connection
connectMongoDB("mongodb://0.0.0.0:27017/short-url").then(() => {
  return console.log("MongoDB connected");
});

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

//server-Side rendering
// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.get("/url/:shortId", async (req, res) => {
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
