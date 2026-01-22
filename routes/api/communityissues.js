const express = require('express');
const router = express.Router();
const LocalIssue = require('../../model/communityproblem');

// Route: POST /submit-local-issue
router.post('/submit-local-issue', async (req, res) => {
  const { name, phone, problem } = req.body;

  // Basic field validation
  if (!name || !phone || !problem) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check for duplicate phone number or name
    const existingIssue = await LocalIssue.findOne({
      $or: [{ phone }, { name }]
    });

    if (existingIssue) {
      return res.status(409).json({ message: 'This issue is already reported.' });
    }

    const newIssue = new LocalIssue({ name, phone, problem });
    await newIssue.save();

    res.status(201).json({ message: 'Issue reported successfully!' });
  } catch (error) {
    console.error('Error saving local issue:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
router.get('/get-community-issues', async (req, res) => {
  try {
    const issues = await LocalIssue.find();
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching community issues' });
  }
});

module.exports = router;
