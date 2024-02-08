const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handelCreateNewUser,
} = require("../controllers/user");
const router = express.Router();

//Routes
router.route("/").get(handleGetAllUsers).post(handelCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = router;

// router.get("/", async (req, res) => {
//   const allDbUser = await User.find({});
//   const html = `
//     <ul>
//     ${allDbUser
//       .map((user) => `<li> ${user.firstName} - ${user.email}</li>`)
//       .join("")}
//       </ul>
//       `;
//   res.send(html);
// });
