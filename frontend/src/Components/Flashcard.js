import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcard.css';
import Header from './Header';
import Footer from './Footer';

const Flashcard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    axios.get('/api/flashcards')
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  }, []);

  const goToNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const goToPrevCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const toggleAnswer = () => {
    setShowAnswer((prevShowAnswer) => !prevShowAnswer);
  };

  const currentCard = flashcards[currentCardIndex];

  return (
    <div>
      <Header />
      <div className="id30 flashcard-container">
        {currentCard && (
          <>
            <div className={`flashcard ${showAnswer ? 'flip' : ''}`} onClick={toggleAnswer}>
              <div className="card-content">
                <div className="front">{currentCard.question}</div>
                <div className="back">{currentCard.answer}</div>
              </div>
            </div>
            <div className="navigation-buttons">
              <button className="prev-button" onClick={goToPrevCard} disabled={flashcards.length <= 1}>Prev</button>
              <button className="next-button" onClick={goToNextCard} disabled={flashcards.length <= 1}>Next</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Flashcard;
