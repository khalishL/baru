const router = require("express").Router();
const Controller = require("../controllers");
const UserController = require("../controllers/user");

//tes
router.get("/", Controller.home);
router.get("/api/posts", Controller.readAllPost);
router.get("/api/posts/:id", Controller.readPostById);
router.get("/api/users", Controller.readAllUser);
router.get("/api/users/:id", Controller.readUserById);
router.get(`/add-like/:id`, Controller.likeIncrement);

// User
router.get("/register", UserController.registerGet);
router.post("/register", UserController.registerPost);
router.get("/login", UserController.loginGet);
router.post("/login", UserController.loginPost);
// router.get("/profile", sessionChecker, UserController.profileGet);  // nanti pakai session disinih
// router.post("/profile", sessionChecker, UserController.profilePost); // nanti pakai session disinih
router.get("/logout", UserController.logout);

module.exports = { router };
