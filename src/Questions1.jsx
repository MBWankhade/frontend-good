import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Questions = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const[isLoading,setIsLoading] = useState(true);
  React.useEffect(() => {
    if (token) {
      // Fetch additional data from the server when token exists
      fetch('http://localhost:3000/admin/questions', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          // Update state with user data
          console.log(data);
          setIsLoading(false);
        })
        .catch((error) => {
        setIsLoading(false);
          console.error('Error:', error);
        });
    }
    else{
        console.log('log in please')
        setIsLoading(false);
    }
  }, [])

  // Sample question data
  const questionData = {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
    solutionPDF: 'path/to/solution.pdf',
  };

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Button
          variant='contained'
          onClick={() => {
            navigate('/addquestions');
          }}
        >
          Add Questions
        </Button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Typography variant='h6'>Questions Added by You</Typography>
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant='h5'>{questionData.question}</Typography>
        <div style={{ margin: '20px' }}>
          {questionData.options.map((option, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input type='radio' id={`option${index}`} name='options' />
              <label htmlFor={`option${index}`} style={{ marginLeft: '5px' }}>
                {option}
              </label>
            </div>
          ))}
        </div>
        <div>
          <Button
            variant='outlined'
            onClick={() => {
              window.open(questionData.solutionPDF, '_blank');
            }}
          >
            View Solution PDF
          </Button>
        </div>
      </div>
    </>
  );
};

export default Questions;
