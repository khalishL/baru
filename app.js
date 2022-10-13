const express = require("express");
const { router } = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  session({
    secret: "ActivePost",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
