const { User } = require("../models");
const { hashPassword, passwordIsTrue } = require("../helpers/bcrypt");

class UserController {
  static registerGet(req, res) {
    res.render("register", { error: [] });
  }
  static registerPost(req, res) {
    let body = req.body;
    User.create(body)
      .then((addUser) => {
        res.redirect(`/login`);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static loginGet(req, res) {
    res.render("loginPage", { error: [] });
  }
  static loginPost(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    User.findOne({
      where: { userName: userName },
    })
      .then((user) => {
        if (passwordIsTrue(password, user.password)) {
          req.session.authenticated = true;
          req.session.UserId = user.id;
          res.redirect(`/posts`);
        } else {
          res.render("loginPage", { error: ["Password tidak sesuai"] });
        }
      })
      .catch((err) => {
        console.log(err);
        res.render("loginPage", { error: ["Username tidak ditemukan"] });
      });
  }
  static profileGet(req, res) {}
  static profilePost(req, res) {}
  static logout(req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  }
}

module.exports = UserController;
