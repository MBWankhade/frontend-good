import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  InputLabel,
  Input,
  FormControl,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#4CAF50',
    },
  },
});

const AddQuestions = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [solutionPdf, setSolutionPdf] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === 'application/pdf') {
      setSolutionPdf(file);
      setSelectedFileName(file.name);
    } else {
      alert('Please select a valid PDF file.');
      e.target.value = null;
    }
  };

  const handleFileButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('question', question);
    options.forEach((element, index) => {
      formData.append(`options[${index}]`, element);
    });
    formData.append('imageSolution', solutionPdf);

    fetch(`${backendURL}/admin/addQuestion`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data);
        alert('Question Added Successfully');
      })
      .catch(error => {
        console.error('Error:', error);
      });

    console.log('Submitted:', { question, options, solutionPdf });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" style={{ marginTop: '50px' }}>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          <Typography component="h1" variant="h4" style={{ marginBottom: '20px', color: theme.palette.primary.main, textAlign: 'center' }}>
            Add Question
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography style={{ marginBottom: '10px', color: theme.palette.primary.main }}>Options:</Typography>
              {options.map((option, index) => (
                <TextField
                  key={index}
                  variant="outlined"
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  style={{ marginBottom: '10px' }}
                />
              ))}
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Solution PDF</InputLabel>
                <Input
                  id="fileInput"
                  type="file"
                  onChange={handlePdfChange}
                  accept=".pdf"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleFileButtonClick}
                  style={{ marginTop: '10px' }}
                >
                  Choose File
                </Button>
                <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
                  {selectedFileName}
                </Typography>
              </FormControl>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: theme.palette.primary.main }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddQuestions;
