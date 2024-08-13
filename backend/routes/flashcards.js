const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  db.getConnection((err) => {
    if (err) {
      console.error('Database connection error:', err);
      return;
    }
    console.log('Database connected successfully');
  });


router.get('/', (req, res) => {
  const query = 'SELECT * FROM flashcards';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching flashcards:', err);
      return res.status(500).json({ error: 'Failed to fetch flashcards.' });
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM flashcards WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching flashcard:', err);
      return res.status(500).json({ error: 'Failed to fetch flashcard.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Flashcard not found.' });
    }
    res.json(results[0]);
  });
});


router.post('/', (req, res) => {
  const { question, answer } = req.body;

 
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required.' });
  }

  const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  db.query(query, [question, answer], (err, result) => {
    if (err) {
      console.error('Error adding flashcard:', err);
      return res.status(500).json({ error: 'Failed to add flashcard.' });
    }
    res.status(201).json({ message: 'Flashcard added successfully.', id: result.insertId });
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;


  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required.' });
  }

  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  db.query(query, [question, answer, id], (err, result) => {
    if (err) {
      console.error('Error updating flashcard:', err);
      return res.status(500).json({ error: 'Failed to update flashcard.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Flashcard not found.' });
    }
    res.json({ message: 'Flashcard updated successfully.' });
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting flashcard:', err);
      return res.status(500).json({ error: 'Failed to delete flashcard.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Flashcard not found.' });
    }
    res.json({ message: 'Flashcard deleted successfully.' });
  });
});

module.exports = router;
