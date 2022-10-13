const router = require("express").Router();
const Controller = require("../controllers");
const UserController = require("../controllers/user");

// API
router.get("/", Controller.home);
router.get("/api/posts", Controller.readAllPost);
router.get("/api/posts/:id", Controller.readPostById);
router.get("/api/users", Controller.readAllUser);
router.get("/api/users/:id", Controller.readUserById);
router.post("/api/register", UserController.registerPost);

// Pages
router.get("/posts", Controller.renderAllPost);
router.get("/register", UserController.registerGet);
router.get("/login", UserController.loginGet);

// User
router.post("/login", UserController.loginPost);
// router.get("/profile", sessionChecker, UserController.profileGet);  // nanti pakai session disinih
// router.post("/profile", sessionChecker, UserController.profilePost); // nanti pakai session disinih
router.get("/logout", UserController.logout);

module.exports = { router };
