import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Header from './Header';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Admin = () => {
  const [flashcards, setFlashcards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/flashcards')
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  }, []);

  const handleEdit = (id) => {
    
    navigate(`/editquestion/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/flashcards/${id}`)
      .then(response => {
        setFlashcards(prevFlashcards => prevFlashcards.filter(card => card.id !== id));
      })
      .catch(error => {
        console.error('Error deleting flashcard:', error);
      });
  };

  return (
    <>
      <Header />
      <div className="id11 Admin-container">
        {flashcards.length === 0 ? (
          <div className="no-cards-message">
            <p>No flashcards available. Click the button below to add a new flashcard.</p>
            <button className="add-button" onClick={() => navigate('/addquestion')}>
              <FaPlus /> Add Flashcard
            </button>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <button className="add-button" onClick={() => navigate('/addquestion')}>
                <FaPlus /> Add Flashcard
              </button>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
              {flashcards.map((card) => (
                <div key={card.id} className="Admin-card">
                  <div className="ml-10 mb-4 card-header">
                    <button className="edit-button" onClick={() => handleEdit(card.id)}>
                      <FaEdit />
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(card.id)}>
                      <FaTrash />
                    </button>
                  </div>
                  <div className="Admin-content">
                    <div className="question">Question: {card.question}</div>
                    <div className="answer">Answer: {card.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Admin;
