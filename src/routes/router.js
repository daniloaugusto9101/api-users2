const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getUser);
router.post("/users", userController.addUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.delUser);

router.use("/", (req, res) => {
  res.status(200);
  res.send(`Bem vindo! Página inicial da API`);
});

module.exports = router;
