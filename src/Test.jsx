import React from 'react';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Button } from '@mui/material';

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const Test = () => {
  const [isLoading, setisLoading] = useState(true);
  const [que, setQue] = useState([]);

  useEffect(() => {
    fetch(`${backendURL}/admin/getAllQuestions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((d) => {
        // Handle the response data here
        console.log(d.data);
        setisLoading(false);
        setQue(d.data);
        console.log(isLoading);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography
  variant='h4'
  style={{
    marginBottom: '20px',
    textAlign: 'center',
    color: '#1976D2',
    fontFamily: 'cursive',
    fontWeight: 'bold',
    letterSpacing: '1px',
    lineHeight: '1.5',
  }}
>
  Seize the advantage! While others sleep, unlock your potential with the ultimate test experience. Stay ahead of the curve – the journey to success begins now!
</Typography>


      {isLoading ? (
        <CircularProgress color='secondary' />
      ) : (
        <>
          {que.map((questionData, index) => (
            <div
              key={index}
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
                  <div key={questionData.id} style={{ marginBottom: '10px' }}>
                    <input type='radio' id={`option${index}`} name='options' />
                    <label
                      htmlFor={`option${index}`}
                      style={{ marginLeft: '5px' }}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <Button
                  data-key={JSON.stringify(questionData.imageSolution)}
                  variant='outlined'
                  onClick={(e) => {
                    const fileInfo = JSON.parse(e.currentTarget.getAttribute('data-key'));

                    // Accessing the buffer from the fileInfo object
                    const pdfBuffer = fileInfo.buffer.data;

                    // Creating a Blob from the buffer
                    const blob = new Blob([Uint8Array.from(pdfBuffer)], { type: fileInfo.mimetype });

                    // Creating a URL for the Blob
                    const url = window.URL.createObjectURL(blob);

                    // Opening a new window with the PDF
                    const newWindow = window.open(url, '_blank');

                    // Cleanup
                    window.URL.revokeObjectURL(url);
                  }}
                >
                  View Solution PDF
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Test;
