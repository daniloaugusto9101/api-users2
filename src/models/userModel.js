const { log } = require("console");
const fs = require("fs");

require("dotenv").config();
const DATA_BASE = process.env.DATA_BASE;

const getAll = () => {
  const db = JSON.parse(fs.readFileSync(DATA_BASE, { encoding: "utf-8" }));
  return db;
};

const getUser = (userID) => {
  let db = getAll();
  return (arr = db.filter((item) => item.id == userID));
};

const addUser = (user) => {
  let db = getAll();
  db.push(user);
  fs.writeFileSync(DATA_BASE, JSON.stringify(db), {
    encoding: "utf-8",
  });
  return user;
};

const updateUser = (id, corpo) => {
  let db = getAll();
  const objeto = db.find((obj) => obj.id == id);
  if (objeto) {
    objeto.id = corpo.id;
    objeto.name = corpo.name;
    objeto.email = corpo.email;
    objeto.password = corpo.password;
    fs.writeFileSync(DATA_BASE, JSON.stringify(db), {
      encoding: "utf-8",
    });
    return objeto;
  }
  return false;
};

const delUser = (userID) => {
  let db = getAll();
  const index = db.findIndex((obj) => obj.id == userID);

  if (index !== -1) {
    db.splice(index, 1);
  }
  fs.writeFileSync(DATA_BASE, JSON.stringify(db), {
    encoding: "utf-8",
  });
  return index;
};

const clearDatabase = () => {
  const emptyDatabase = [];
  fs.writeFileSync(DATA_BASE, JSON.stringify(emptyDatabase), {
    encoding: "utf-8",
  });
};

module.exports = {
  getAll,
  getUser,
  addUser,
  updateUser,
  delUser,
  clearDatabase,
};
