const Router = require("express");
const { User } = require("./model");

const router = new Router();

router.post("/user", (req, res, next) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  User.create(user)
    .then(user => res.json(user))
    .catch(error => next(error));
});
module.exports = router;
