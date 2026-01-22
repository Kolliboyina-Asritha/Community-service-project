require('dotenv').config();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { name, pwd } = req.body;
  if (!name || !pwd) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const foundUser = await User.findOne({ name: name }).exec();  // or use email if preferred
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) return res.sendStatus(401); // Unauthorized

    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "name": foundUser.name
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' }
    );

    const refreshToken = jwt.sign(
      { name: foundUser.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

 res.cookie('jwt', refreshToken, {
  httpOnly: true,
  secure: false, // true in production with HTTPS
  sameSite: 'Lax', // or 'None' if frontend and backend are on different origins and you use HTTPS
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

    res.json({ accessToken });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { handleLogin };
