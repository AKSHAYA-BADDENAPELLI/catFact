import React, { useState } from 'react';

function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFact = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError('Failed to fetch fact. Please try again.');
      setFact('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>🐱 Random Cat Fact Generator</h1>
      <button onClick={fetchFact} style={styles.button} disabled={loading}>
        {loading ? 'Loading...' : 'Get Cat Fact'}
      </button>
      {error && <p style={{ ...styles.fact, color: 'red' }}>{error}</p>}
      {fact && !error && <p style={styles.fact}>{fact}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '20px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  fact: {
    fontSize: '18px',
    marginTop: '20px',
    maxWidth: '600px',
    margin: 'auto',
  },
};

export default App;
