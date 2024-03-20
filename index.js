const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = 1000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// File path to store the date
const filePath = './date.json';

// POST endpoint to receive day, month, and year and store the date in a file
app.post('/date', async (req, res) => {
  const { day, month, year } = req.body;

  // Create a JSON object with the received date
  const dateObject = { day, month, year };

  try { 
    // Write the data to the file
    await fs.writeFile(filePath, JSON.stringify(dateObject));

    // Respond with the stored date
    res.json(dateObject);
  } catch (error) {
    console.error('Error writing to file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to retrieve the stored date from the file
app.get('/date', async (req, res) => {
  try {
    // Read the data from the file
    const data = await fs.readFile(filePath, 'utf8');

    // Parse the JSON data
    const dateObject = JSON.parse(data);

    // Respond with the stored date
    res.json(dateObject);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
