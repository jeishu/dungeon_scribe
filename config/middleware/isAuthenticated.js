module.exports = function(req, res, next) {
  if (req.user) { // redirects not loggin in users to home page
    return next();
  }

  return res.redirect("/");
};
