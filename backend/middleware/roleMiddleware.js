const allowRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access Denied",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
};

module.exports = allowRoles;