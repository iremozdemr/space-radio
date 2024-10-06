// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint for handling chat requests
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GENERATIVE_AI_API_KEY}`,
        },
        params: {
          key: process.env.GENERATIVE_AI_API_KEY,
        },
      }
    );

    const generatedText = response.data.choices[0].message.content;
    res.json({ reply: generatedText });
  } catch (error) {
    console.error('Error communicating with Generative AI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate content.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
