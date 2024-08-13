import React, { useState } from 'react';
import axios from 'axios';
import './AddQuestions.css';
import Header from './Header';
import Footer from './Footer';

function AddQuestions() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/flashcards', { question, answer })
      .then(response => {
        console.log('Flashcard added:', response.data);
        setQuestion('');
        setAnswer('');
        setSuccessMessage('Flashcard added successfully!');
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error adding flashcard:', error);
        setErrorMessage('There was an error adding the flashcard.');
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <Header />
      <div className="container mt-5 mb-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="card shadow">
              <div className="card-header text-center border-bottom">
                <h2 className="p-3">Add a Question and Answer</h2>
              </div>
              <div className="card-body bg-light">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="question" className="form-label">
                      Question
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="answer" className="form-label">
                      Answer
                    </label>
                    <textarea
                      className="form-control"
                      id="answer"
                      rows="4"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Question
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddQuestions;
