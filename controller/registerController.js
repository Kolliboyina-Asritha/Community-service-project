const User = require('../model/user');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { name, mobileno, pwd } = req.body;

  // Validation
  if (!name || !mobileno || !pwd) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check for duplicate mobile number
    const duplicate = await User.findOne({ mobileno }).exec();
    if (duplicate) return res.status(409).json({ message: 'Mobile number already registered.' });

    // Hash password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create user
    const result = await User.create({
      name,
      mobileno,
      password: hashedPwd,
    });

    console.log('New user created:', result);
    res.status(201).json({ success: 'New user created!' });

  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
