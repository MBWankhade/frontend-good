import React from 'react'
import { Button } from '@mui/material'

const Sample = () => {
  const handleClick = (e) => {
    // Retrieve the key from the data-key attribute
    const key = e.currentTarget.getAttribute('data-key');
    console.log(key);
  };

  return (
    <>
      <Button data-key='132' onClick={handleClick}>hi</Button>
    </>
  );
}

export default Sample;
