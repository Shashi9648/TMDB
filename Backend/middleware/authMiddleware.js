const jwt = require('jsonwebtoken');
const Candidate = require('../models/Candidate');

const protect = async (req, res, next) => {

  let token;

  try {

    // CHECK TOKEN EXISTS
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {

      // GET TOKEN
      token = req.headers.authorization.split(' ')[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // GET Candidate WITHOUT PASSWORD
      req.Candidate = await Candidate.findById(decoded.id)
        .select('-password');

      next();

    } else {

      return res.status(401).json({
        message: 'Not authorized, token missing'
      });
    }

  } catch (error) {

    console.log('AUTH ERROR:', error);

    return res.status(401).json({
      message: 'Not authorized, invalid token'
    });
  }
};

module.exports = protect;