/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
}

export default auth;
