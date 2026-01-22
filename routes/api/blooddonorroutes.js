const express = require('express');
const router = express.Router();
const BloodDonor = require('../../model/blooddonor'); // adjust path if needed

// POST route to submit blood donor form
router.post('/submit-blood-donor', async (req, res) => {
  const { name, phone, age, bloodgroup, condition } = req.body;

  // Basic server-side validation
  if (!name || !phone || !age || !bloodgroup || !condition) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newDonor = new BloodDonor({
      name,
      phone,
      age,
      bloodgroup,
      condition
    });

    await newDonor.save();

    // Respond with success JSON
    res.status(201).json({ message: "Donor registered successfully" });

  } catch (err) {
    if (err.code === 11000) {
      // Duplicate error on name or phone
      return res.status(409).json({
        message: err.keyPattern.phone
          ? "Phone number already exists"
          : "Name already exists"
      });
    }

    console.error("Error registering blood donor:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get('/get-all-donors', async (req, res) => {
  try {
   const donors = await BloodDonor.find();
    console.log("Donors fetched from server:", donors);// only these 3 fields
    res.status(200).json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
