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
} from '@mui/material';

const backendURL = 'https://backend-platform-oxxu.onrender.com';

const AddQuestions = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [solutionPdf, setSolutionPdf] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];

    // Check if the selected file is a PDF
    if (file && file.type === 'application/pdf') {
      setSolutionPdf(file);
    } else {
      alert('Please select a valid PDF file.');
      // Clear the input field
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem('token'))
    const formData = new FormData();
    formData.append('question', question);
    options.forEach((element, index) => {
      formData.append(`options[${index}]`, element);
    });
    formData.append('imageSolution', solutionPdf); // Updated field name to match backend
    
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
      // Handle success, update UI or show a success message
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error, show an error message, etc.
    });
    console.log('Submitted:', { question, options, solutionPdf });

  };

  return (
    <Container component="main" maxWidth="md">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5">
          Add Question
        </Typography>

        <Grid container spacing={2}>
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
            <Typography>Options:</Typography>
            {options.map((option, index) => (
              <TextField
                key={index}
                variant="outlined"
                fullWidth
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Solution PDF</InputLabel>
              <Input
                type="file"
                onChange={handlePdfChange}
                accept=".pdf"
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddQuestions;
