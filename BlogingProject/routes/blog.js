const { Router } = require("express");
const multer = require("multer");
const path = require("path");
// const Blog = require("../models/blog");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/${req.user._id} `));
  },
  filename: function (req, file, cb) {
    const fileName = `${Data.now()}-${file.originalname}`;
  },
});

const upload = multer({ storage: storage });

router.get("/addNew", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  // const { title, body, coverImage } = req.body;
  console.log(req.body);
  res.redirect("/");

  // await Blog.create({
  //   title,
  //   body,
  //   coverImage,
  // });
});

module.exports = router;
