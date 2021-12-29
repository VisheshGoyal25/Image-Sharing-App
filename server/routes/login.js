const router = require("express").Router();
const passport = require("passport");
require("dotenv").config()
const CLIENT_URL = process.env.Client_url;
router.get("/login/success", (req, res) => {
  
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      auth: req.headers.cookie,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});


router.get("/logout", (req, res) => {
  req.headers.cookie=null
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", 'email'] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile",'user:email'] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", 'email'] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router