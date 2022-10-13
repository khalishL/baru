const { Post, Tag, User, Like, Comment, Profile } = require("../models");

class Controller {
  static home(req, res) {
    res.render("home");
  }
  static readAllPost(req, res) {
    Post.findAll({
      include: [Tag, User, Like, Comment],
    })
      .then((post) => {
        res.send(post);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static readPostById(req, res) {
    const id = req.params.id;
    Post.findOne({
      where: { id: id },
      include: [Tag, User, Like, Comment],
    })
      .then((post) => {
        res.send(post);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static readAllUser(req, res) {
    User.findAll({
      include: [Like, Profile],
    })
      .then((post) => {
        res.send(post);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static readUserById(req, res) {
    const id = req.params.id;
    User.findOne({
      where: { id: id },
      include: [Like, Profile],
    })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static likeIncrement(req, res) {
    Comment.increment({ like: 1 }, { where: { id: +req.params.id } })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
