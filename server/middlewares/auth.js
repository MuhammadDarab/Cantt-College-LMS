function authMiddleWare(req, res, next) {
  if (req.user) return next();
  else
    return res
      .status(401)
      .send({ authorized: false, message: "Un-authorized" });
}

module.exports = {
  authMiddleWare,
};
