// routes/templeRoutes.js
const express = require('express');
const router = express.Router();
const TempleDonor = require('../../model/temple');
const upload = require('../../middleware/upload');

router.post('/submit-temple-form', upload.single('oldPhotos'), async (req, res) => {
  const { name, phoneNumber, donationAmount } = req.body;
  const oldPhoto = req.file ? req.file.filename : '';

  if (!name || !phoneNumber || !donationAmount) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const newDonor = new TempleDonor({
      name,
      phoneno: phoneNumber,
      donationAmount,
      oldPhoto
    });

    await newDonor.save();
    res.status(201).json({ message: "Temple donation submitted successfully!", redirect: "/homepage.html" });

  } catch (err) {
    console.error('Error saving donor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/get-temple-donors', async (req, res) => {
  try {
    const donors = await TempleDonor.find(); // fetch all fields
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching temple donors' });
  }
});

module.exports = router;
