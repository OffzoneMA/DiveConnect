const { isTokenValid } = require("../utils/jwt");
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.body.user = { name, userId, role };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ error: "Authentication Invalid" });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
