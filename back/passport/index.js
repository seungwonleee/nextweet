const passport = require("passport");
const local = require("./local");
module.exports = () => {
  passport.serializeUser(() => {});
  passport.deserializeUser(() => {});

  local();
};
