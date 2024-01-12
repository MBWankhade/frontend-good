// import React from 'react'
// import { useState } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import { Typography } from '@mui/material';

// const Tests= () => {
//     const [isLoading,setIsLoading] = useState(true);
//     const [que,setQue] = useState([]);
//     React.useEffect(()=>{
//         fetch('http://localhost:3000/admin/getAllQuestions', {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json',
//             },
//             })
//             .then(response => {
//                 if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // Handle the response data here
//                 console.log(data);
//                 setIsLoading(false);
//                 setQue(data);
//                 console.log(que.length)
//             })
//             .catch(error => {
//                 // Handle errors here
//                 console.error('Fetch error:', error);
//             });
//     },[])
//   return (
//     <>
//         {que.length>0?(
//             <>
//                 {isLoading?(
//                     <>
//                         <CircularProgress color="secondary" />
//                     </>
//                 ):(
//                     <>
//                     {que.map((questionData, index) => (
//             <div
//               key={index}
//               style={{
//                 border: '1px solid #ccc',
//                 borderRadius: '8px',
//                 padding: '20px',
//                 margin: '20px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <Typography variant='h5'>{questionData.question}</Typography>
//               <div style={{ margin: '20px' }}>
//                 {questionData.options.map((option, index) => (
//                   <div key={questionData.id} style={{ marginBottom: '10px' }}>
//                     <input type='radio' id={`option${index}`} name='options' />
//                     <label
//                       htmlFor={`option${index}`}
//                       style={{ marginLeft: '5px' }}
//                     >
//                       {option}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <Button
//                   data-key={JSON.stringify(questionData.imageSolution)}
//                   variant='outlined'
//                   onClick={(e) => {
//                     const fileInfo = JSON.parse(e.currentTarget.getAttribute('data-key'));
                  
//                     // Accessing the buffer from the fileInfo object
//                     const pdfBuffer = fileInfo.buffer.data;
                  
//                     // Creating a Blob from the buffer
//                     const blob = new Blob([Uint8Array.from(pdfBuffer)], { type: fileInfo.mimetype });
                  
//                     // Creating a URL for the Blob
//                     const url = window.URL.createObjectURL(blob);
                  
//                     // Opening a new window with the PDF
//                     const newWindow = window.open(url, '_blank');
                  
//                     // Cleanup
//                     window.URL.revokeObjectURL(url);
//                   }}                  
                  
//                 >
//                   View Solution PDF
//                 </Button>
//                 <Button
//                   style={{
//                     marginLeft:'10px',
//                   }}
//                   variant='outlined'
//                   data-key={questionData._id+""}
//                   onClick={handleDeleteQuestion}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </>
//                 )}
//             </>
//         ):
//         (
//             <Typography>Pls Login</Typography>
//         )
//         }
//     </>
//   )
// }

// export default Test