const { Post, Tag, User, Like, Comment, Profile } = require("../models");
const { Op } = require("sequelize");

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
  // Add Post
  static createPost(req, res) {
    const body = req.body;
    body.UserId = req.session.UserId;
    Post.create(body)
      .then((responsePost) => {
        res.redirect(`/posts`);
      })
      .catch((err) => {
        console.log(err);
        res.render("addPost", { error: err });
      });
  }
  // Add Like
  static createLike(req, res) {
    const postId = req.params.id;
    const userId = req.session.UserId;
    console.log("postId", postId);
    console.log("userId", userId);
    Like.findAll({
      where: { PostId: postId },
    })
      .then((likes) => {
        const likingUsers = likes.map((like) => like.UserId);
        console.log("likingUsers", likingUsers);
        if (likingUsers.includes(userId)) {
          res.redirect("/posts");
        } else {
          Like.create({ UserId: userId, PostId: postId })
            .then((responseLike) => {
              console.log("responseLike", responseLike);
              res.redirect(`/posts`);
            })
            .catch((err) => {
              console.log(err);
              res.redirect("/posts");
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
  // Add Comment
  static createComment(req, res) {
    const content = req.body.content;
    const postId = req.params.id;
    const userId = req.session.UserId;
    Comment.create({ content, PostId: postId, UserId: userId })
      .then((responseComment) => {
        res.redirect(`/posts/${postId}`);
      })
      .catch((err) => {
        console.log(err);
        res.render(`/posts/${postId}`, { error: err });
      });
  }
  // Delete User
  static deleteUser(req, res) {
    const userId = req.params.id;
    User.destroy({
      where: {
        id: userId,
      },
    })
      .then((responseDelete) => {
        res.redirect(`/users`);
      })
      .catch((err) => {
        console.log(err);
        res.render(`/users`, { error: err });
      });
  }

  // Pages
  static renderAllPost(req, res) {
    const { title } = req.query;
    const options = {};

    if (title) {
      options.title = { [Op.iLike]: `%${title}%` };
    }

    Post.findAll({
      include: [Tag, User, Like, Comment],
      where: options,
    })
      .then((posts) => {
        res.render("posts", { posts, UserId: req.session.UserId });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static renderPostById(req, res) {
    const id = req.params.id;
    let savedPost = null;
    Post.findOne({
      include: [Tag, User, Like],
      where: {
        id: id,
      },
    })
      .then((post) => {
        savedPost = post;
        console.log("post", post);
        return Comment.findAll({
          include: [User],
          where: {
            PostId: id,
          },
        });
      })
      .then((comments) => {
        res.render("postDetail", { comments, post: savedPost });
      })
      .catch((err) => {
        console.log("err", err);
        res.send(err);
      });
  }
  static renderAddPost(req, res) {
    res.render("addPost", { error: [] });
  }
  static renderAllUser(req, res) {
    User.findAll({
      include: [Like, Profile, Post],
    })
      .then((users) => {
        res.render("users", { users });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
