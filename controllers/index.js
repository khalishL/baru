const { Post, Tag, User, Like, Comment, Profile } = require("../models");

class Controller {
  static home(req, res) {
    res.render("home");
  }

  // API
  // Get all posts
  static readAllPost(req, res) {
    Post.findAll({
      include: [Tag, User, Like, Comment],
    })
      .then((posts) => {
        res.send(posts);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  // Get post by ID
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
  // Get all users
  static readAllUser(req, res) {
    User.findAll({
      include: [Like, Profile],
    })
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  // Get user by ID
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

  // Pages
  static renderAllPost(req, res) {
    Post.findAll({
      include: [Tag, User, Like, Comment],
    })
      .then((posts) => {
        res.render("posts", { posts });
      })
      .catch((err) => {
        res.render(err);
      });
  }
}

module.exports = Controller;
