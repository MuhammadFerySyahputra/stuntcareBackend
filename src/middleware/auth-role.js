const authorize = (req, res, next) => {
  const { accessToken, userRole } = req.cookies;

  if (!accessToken || (userRole !== 'admin' && userRole !== 'superadmin')) {
    res.status(403).send({ error: 'Access denied' });
  }
  next();
};

module.exports = authorize;
