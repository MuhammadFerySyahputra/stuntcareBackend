/* eslint-disable*/
const jwt = require('jsonwebtoken');
const ResponseError = require('../error/response-error');
const user = require('../models/user');

const verifyToken = (req, res, next) => {
  const { accessToken, userRole } = req.cookies;

    if (!accessToken || (userRole !== "admin" && userRole !== "superadmin")) {
      res.status(403).send({ error: "Access denied" });
      res.redirect("/");
    }
    res.locals.userRole = userRole;
    next();
};


module.exports = verifyToken;
