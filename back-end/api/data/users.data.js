const bcrypt = require('bcryptjs');

const users = [
  {
    name: "user 1",
    email: "user1@gmail.com",
    password: bcrypt.hashSync("user1", 10),
    isAdmin: false,
    isSeller: false
  }, {
    name: "user 2",
    email: "user2@gmail.com",
    password: bcrypt.hashSync("user2", 10),
    isAdmin: false,
    isSeller: false

  }, {
    name: "admin 1",
    email: "admin1@gmail.com",
    password: bcrypt.hashSync("admin1", 10),
    isAdmin: true,
    isSeller: false
  }, {
    name: "admin 2",
    email: "admin2@gmail.com",
    password: bcrypt.hashSync("admin2", 10),
    isAdmin: true,
    isSeller: false
  }
]

module.exports = users;