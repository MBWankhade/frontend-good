  import React, { useState, useEffect } from 'react';
  import Button from '@mui/material/Button';
  import { Typography } from '@mui/material';
  import CircularProgress from '@mui/material/CircularProgress';
  import { useNavigate } from 'react-router-dom';

  const backendURL = 'https://backend-platform-oxxu.onrender.com';
  
  const LandingPage = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [motivationalQuote, setMotivationalQuote] = useState('');
  
    useEffect(() => {
      // Sample motivational quotes
      const quotes = [
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Believe you can and you're halfway there.",
        "The only way to do great work is to love what you do.",
        "Your time is limited, don't waste it living someone else's life.",
        "The only limit to our realization of tomorrow will be our doubts of today.",
        "विजेते वेगळ्या गोष्टी करत नाही ते प्रत्येक गोष्ट वेगळेपणाने करतात.",
        "शब्दांपेक्षा शांत राहूनच जास्त आक्रमक होता येत.",
        "आज मी निदान एक पाऊल पुढे टाकीन, निदान एक काम पूर्ण करीन, निदान एक अडथळा ओलांडिन, निदान प्रयत्न तरी करीनच करीन.",
        "न हरता, न थकता न थाबंता प्रयत्न करण्यांसमोर कधी कधी नशीब सुध्दा हरत.",
        "जीवनात चांगल्या माणसांना शोधू नका, स्वतः चांगले व्हा आणि कुणीतरी तुम्हाला शोधत येईल.",
        "परिस्थिती कशीही असू द्या तुम्ही फक्त लढायला शिका यश नक्की मिळेल.",
        "सिंह बना सिंहासनाची चिंता करू नका, तुम्ही जिथे बसणार तोच सिंहासन बनेल.",
        "आयुष्यात प्रत्येक क्षणाचा आनंद घ्या कारण इथं पुन्हा Once More नसतो.",
        "खूप माणसांची स्वप्ने या एका विचारामुळे अपूर्ण राहतात, ते म्हणजे “लोक काय म्हणतील”.",
        "दुसऱ्यासाठी काम करण्यापेक्षा स्वत:चं साम्राज्य निर्माण करणे केव्हाही चांगलेच.",
        "जिंकणे म्हणजे नेहमी फक्त पहिला येणे असे नाही तर, एखादी गोष्ट पूर्वीपेक्षा जास्त चांगली करणे म्हणजेच जिंकणे होय.",
        "नकारात्मक दृष्टिकोण हा पंचर झालेल्या टायरासारखा असतो त्याला बदलल्याशिवाय तुम्ही पुढे जाऊ शकत नाही.",
        "आयुष्यात अश्रूंशी संघर्ष केल्यानंतर चेहऱ्यावर उमटलेल्या हास्या इतके सुंदर काहीच नसते.",
        "कितीही अपयश आले तरी हार मानायची नाही कारण कुणीही एका प्रयत्नात यशस्वी होत नाही.",
        "फक्त एकदा यशस्वी व्हा मग बघा तुमचा कॉल नाही उचलणारे दररोज कॉल करतील.",
        "लोक तुम्हाला कसे बघतात ते महत्त्वाचं नाही तुम्ही स्वतःला कसे बघतात ते महत्त्वाचं आहे.",
        "आधी सिध्द व्हा, मग आपोआपच प्रसिध्द व्हाल.",
        "Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work. - APJ Abdul Kalam",
        "If you want to shine like a sun, first burn like a sun. - APJ Abdul Kalam",
        "To succeed in your mission, you must have single-minded devotion to your goal. - APJ Abdul Kalam",
        "If four things are followed - having a great aim, acquiring knowledge, hard work, and perseverance - then anything can be achieved. - APJ Abdul Kalam",
        "Climbing to the top demands strength, whether it is to the top of Mount Everest or to the top of your career. - APJ Abdul Kalam",
        "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck. - APJ Abdul Kalam",
        "To become 'unique,' the challenge is to fight the hardest battle which anyone can imagine until you reach your destination. - APJ Abdul Kalam",
        "Never stop fighting until you arrive at your destined place - the unique you. Have an aim in life, continuously acquire knowledge, work hard, and have perseverance to realise the great life. - APJ Abdul Kalam",
        "Determination is the power that sees us through all our frustrations and obstacles. It helps us in building our willpower which is the very basis of success. - APJ Abdul Kalam",
        "Dream is not that which you see while sleeping it is something that does not let you sleep. - A.P.J. Abdul Kalam",
        "A big shot is a little shot who keeps on shooting, so keep trying. - A.P.J. Abdul Kalam, Wings of Fire",
        "The country doesn't deserve anything less than success from us. Let us aim for success. - A.P.J. Abdul Kalam, Wings of Fire",
        "Great dreams of great dreamers are always transcended. - Dr. A.P.J. Abdul Kalam",
        "Be more dedicated to making solid achievements than in running after swift but synthetic happiness. - A.P.J. Abdul Kalam, Wings of Fire",
        "To succeed in life and achieve results, you must understand and master three mighty forces— desire, belief, and expectation. - A.P.J. Abdul Kalam, Wings of Fire",
        "I reminded myself that the best way to win was to not need to win. The best performances are accomplished when you are relaxed and free of doubt. - A.P.J. Abdul Kalam, Wings of Fire",
        "It does not matter how large or small your sphere of activity is, what counts finally is the commitment that you bring to the job that has been ordained for you in this life. - A.P.J. Abdul Kalam, My Journey: Transforming Dreams into Actions",
        "Great teachers emanate out of knowledge, passion, and compassion. - A. P. J. Abdul Kalam",
        "Creativity is the key to success in the future, and primary education is where teachers can bring creativity to children at that level. - A. P. J. Abdul Kalam",
        
      ];
    
      // Function to get a random quote
      const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
      };
    
      // Fetch user data if token exists
      if (token) {
        fetch(`${backendURL}/admin`, {
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
            setUserData(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error('Error:', error);
          });
      } else {
        console.log('Please log in');
        setIsLoading(false);
      }
    
      // Set a random motivational quote
      setMotivationalQuote(getRandomQuote());
    }, [token]);
    
  
    return (
      <>
        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {userData ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    borderBottom: '1px solid #ccc',
                    marginBottom: '20px',
                    backgroundColor: '#f8f8f8',
                  }}
                >
                  <Typography variant='h6' style={{ color: '#333' }}>
                    Welcome, {userData.user.username}!
                  </Typography>
                  <Button
                    onClick={() => {
                      localStorage.removeItem('token');
                      setUserData(null);
                      navigate('/');
                    }}
                    variant='outlined'
                    style={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                  >
                    Logout
                  </Button>
                </div>
  
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5%',
                  }}
                >
                  <Button
                    variant='contained'
                    onClick={() => {
                      navigate('/test');
                    }}
                    style={{
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      marginBottom: '20px',
                    }}
                  >
                    Want To Give Test
                  </Button>
  
                  <Typography style={{ marginBottom: '10px' }}>OR</Typography>
  
                  <Button
                    variant='contained'
                    onClick={() => {
                      navigate('/questions');
                    }}
                    style={{
                      backgroundColor: '#2196f3',
                      color: '#fff',
                      marginTop: '10px',
                    }}
                  >
                    Add Questions For Today
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate('/login');
                  }}
                  variant='outlined'
                  style={{
                    color: '#2196f3',
                    borderColor: '#2196f3',
                    margin: '20px 0',
                  }}
                >
                  Login
                </Button>
                <Typography variant='body1' style={{ marginBottom: '20px' }}>
                  To Access, Please Login Using Your Credentials
                </Typography>
              </>
            )}
          </>
        )}
  
        {/* Motivational Quote Section */}
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            padding: '15px',
            backgroundColor: '#f3f3f3',
            borderRadius: '8px',
          }}
        >
          <Typography variant='body1' style={{ fontStyle: 'italic', color: '#333' }}>
            "{motivationalQuote}"
          </Typography>
        </div>
      </>
    );
  };
  
  export default LandingPage;
  