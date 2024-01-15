// Questack.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Button } from '@mui/material';
import './Questack.css'; // Import a separate CSS file for styling

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const Protectedquestack = () => {
  const { adminId, date, adminUsername } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(`${backendURL}/admin/deleteQuestions/${questionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Update the questions state after successful deletion
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${backendURL}/admin/getAllQuestions?adminId=${adminId}&date=${date}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [adminId, date]);

  const renderQuestion = (questionData) => {
    const questionContent = questionData.question;
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const formattedContent = questionContent.replace(linkRegex, (url) => {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });

    return (
      <Typography className="question-text" variant='h5' dangerouslySetInnerHTML={{ __html: formattedContent }} />
    );
  };

  return (
    <div className="questack-container">
      <h2 className="header">Questions Added By <span className="admin-name">{adminUsername}</span> on {date}</h2>
      {isLoading ? (
        <CircularProgress className="loading-spinner" color="secondary" />
      ) : (
        <ul className="questions-list">
          {questions.slice().reverse().map((questionData, index) => (
            <div
              key={index}
              className="question-card"
            >
              {renderQuestion(questionData)}
              <div className="options-container">
                {questionData.options.map((option, index) => (
                  <div key={questionData.id} className="option-item">
                    <input type='radio' id={`option${index}`} name='options' />
                    <label
                      htmlFor={`option${index}`}
                      className="option-label"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <div className="solution-button">
                <Button
                  data-key={JSON.stringify(questionData.imageSolution)}
                  variant='outlined'
                  onClick={(e) => {
                    const fileInfo = JSON.parse(e.currentTarget.getAttribute('data-key'));

                    const pdfBuffer = fileInfo.buffer.data;
                    const blob = new Blob([Uint8Array.from(pdfBuffer)], { type: fileInfo.mimetype });
                    const url = window.URL.createObjectURL(blob);
                    const newWindow = window.open(url, '_blank');
                    window.URL.revokeObjectURL(url);
                  }}
                >
                  View Solution PDF
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteQuestion(questionData._id)}
                >
                    Delete
                </Button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Protectedquestack;
