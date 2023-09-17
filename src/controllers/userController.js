const userModel = require("../models/userModel");

const getAll = (req, res) => {
  user = userModel.getAll();
  res.status(200).json(user);
};

const getUser = (req, res) => {
  const id = req.params.id;
  user = userModel.getUser(id);
  if (user.length > 0) {
    res.status(200).json(user);
  } else {
    res.status(404).json({
      error: "Event not found",
      code: 404,
    });
  }
};

const addUser = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).end();
  } else {
    userModel.addUser(body);
    return res.status(201).json(body);
  }
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const newDB = userModel.updateUser(id, body);
  if (newDB) {
    return res.status(200).json(body);
  } else {
    res.status(404).json({
      error: "Event not found",
      code: 404,
    });
  }
};

const delUser = (req, res) => {
  const id = req.params.id;
  const newDB = userModel.delUser(id);
  if (newDB !== -1) {
    res.status(204).json(newDB);
  } else {
    res.status(404).json({
      error: "Event not found",
      code: 404,
    });
  }
};

module.exports = {
  getAll,
  getUser,
  addUser,
  updateUser,
  delUser,
};
