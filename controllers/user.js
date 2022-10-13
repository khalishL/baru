const { User } = require("../models");
// const { hashPassword, passwordIsTrue } = require("../helpers/bcrypt");

class UserController {
  static registerGet(req, res) {
    res.render("register", { error: [] });
  }
  static registerPost(req, res) {}
  static loginGet(req, res) {}
  static loginPost(req, res) {}
  static profileGet(req, res) {}
  static profilePost(req, res) {}
  static logout(req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  }
}

module.exports = UserController;
