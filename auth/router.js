const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const router = new Router();
const bcryptjs = require("bcryptjs");
const User = require("../user/model");

// define endpoints here

// Login endpoint
router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send({
      message: "Please enter a valid password."
    });
  } else {
    User.findOne({
      where: { email: req.body.email }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "Username or Email does not exist."
          });
        } else if (bcryptjs.compareSync(req.body.password, entity.password)) {
          //if the password is true, return JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
    // Secret endpoint
    router.get("/secret-endpoint", (req, res) => {
      const auth =
        req.headers.authorization && req.headers.authorization.split(" ");
      if (auth && auth[0] === "Bearer" && auth[1]) {
        try {
          const data = toData(auth[1]);
          res.send({
            message: "Thanks for visiting the secret endpoint.",
            data
          });
        } catch (error) {
          res.status(400).send({
            message: `Error ${error.name}: ${error.message}`
          });
        }
      } else {
        res.status(401).send({
          message: "Please supply some valid credentials"
        });
      }
    });
    // res.send({
    //   jwt: toJWT({ userId: 1 })
    // });
  }
});

module.exports = router;
