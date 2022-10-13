const { Post, Tag, User } = require("../models");

class Controller {
  static home(req, res) {
    res.render("home");
  }
  static readAllPost(req, res) {
    Post.findAll({
      include: Tag,
    })  
      .then((post) => {
        res.send(post);
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
