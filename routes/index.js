const router = require("express").Router();
const Controller = require("../controllers");
const UserController = require("../controllers/user");

const sessionChecker = (req, res, next) => {
  if (req.session.UserId) next();
  else res.redirect("/login");
};

const adminChecker = (req, res, next) => {
  if (req.session.role === "admin") next();
  else res.redirect("/posts");
};

const sessionDestroyer = (req, res, next) => {
  if (req.session) req.session.destroy();
  next();
};

// API
router.get("/", Controller.home);
router.get("/api/posts", Controller.readAllPost);
router.get("/api/posts/:id", Controller.readPostById);
router.get("/api/users", Controller.readAllUser);
router.get("/api/users/:id", Controller.readUserById);
router.post("/register", UserController.registerPost);
router.post("/posts/add", Controller.createPost);
router.post("/posts/:id/like", Controller.createLike);
router.post("/comments/:id/add", Controller.createComment);
router.post("/users/:id/delete", Controller.deleteUser);

// Pages
router.get("/posts", sessionChecker, Controller.renderAllPost);
router.get("/posts/add", sessionChecker, Controller.renderAddPost);
router.get("/posts/:id", sessionChecker, Controller.renderPostById);
router.get("/register", UserController.registerGet);
router.get("/login", sessionDestroyer, UserController.loginGet);
router.get("/users", sessionChecker, adminChecker, Controller.renderAllUser);

// User
router.post("/login", UserController.loginPost);
// router.get("/profile", sessionChecker, UserController.profileGet);  // nanti pakai session disinih
// router.post("/profile", sessionChecker, UserController.profilePost); // nanti pakai session disinih
router.get("/logout", UserController.logout);

module.exports = { router };
