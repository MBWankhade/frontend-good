import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const Questions = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [que, setQue] = useState([]);

  const handleDeleteQuestion = (e) => {
    const queId = e.currentTarget.getAttribute('data-key');
    fetch(`${backendURL}/admin/deleteQuestions/${queId}`, {
      method: 'DELETE',
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
      .then((data) => {
        setQue((prevQue) => prevQue.filter((question) => question._id !== queId));
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const renderQuestion = (questionData) => {
    const questionContent = questionData.question;

    // Regular expression to find links in the text
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const formattedContent = questionContent.replace(linkRegex, (url) => {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });

    return (
      <Typography variant='h5' dangerouslySetInnerHTML={{ __html: formattedContent }} />
    );
  };

  React.useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      fetch(`${backendURL}/admin/questions`, {
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
          setQue(data.questions);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error:', error);
        });
    } else {
      console.log('log in please');
      setIsLoading(false);
    }
  }, []);

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
      {isLoading ? (
        <div>
          <CircularProgress color='success' />
        </div>
      ) : que.length <= 0 ? (
        <div>
          <Typography>Kr n questions add Mazlas ka</Typography>
        </div>
      ) : (
        <>
          {que.slice().reverse().map((questionData, index) => (
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
              {renderQuestion(questionData)}
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
                  style={{
                    marginLeft: '10px',
                  }}
                  variant='outlined'
                  data-key={questionData._id + ''}
                  onClick={handleDeleteQuestion}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Questions;
