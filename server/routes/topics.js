const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Groq = require('groq-sdk');

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// GET all topics
router.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });
    res.json({ success: true, data: topics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create topic
router.post('/topics', async (req, res) => {
  try {
    const { name, category, status } = req.body;
    const topic = new Topic({ name, category, status: status || 'Not Started' });
    await topic.save();
    res.status(201).json({ success: true, data: topic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH update status
router.patch('/topics/:id', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: topic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE topic
router.delete('/topics/:id', async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GROQ EXPLANATION - Working version
router.post('/topics/:id/explain', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    console.log('Generating explanation for:', topic.name);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful, enthusiastic teacher. Explain concepts simply for beginners. Use emojis occasionally. Keep responses to 2-3 sentences."
        },
        {
          role: "user",
          content: `Explain "${topic.name}" from the field of ${topic.category} in 2-3 simple sentences. Make it engaging and easy to understand.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const explanation = chatCompletion.choices[0]?.message?.content || "Could not generate explanation.";

    console.log('Explanation generated successfully');

    res.json({
      success: true,
      data: {
        topicName: topic.name,
        explanation: explanation
      }
    });
  } catch (error) {
    console.error('Groq API Error:', error.message);
    // Fallback response
    res.json({
      success: true,
      data: {
        topicName: topic.name,
        explanation: ` "${topic.name}" is an important concept in ${topic.category}. Keep learning and you'll master it! 🚀`
      }
    });
  }
});

module.exports = router;