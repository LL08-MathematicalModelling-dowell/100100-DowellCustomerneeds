import { useState } from 'react';

const useSentenceGeneration = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSentences = async (finalScore) => {
    try {
      setLoading(true);

      const apiUrl = 'http://127.0.0.1:8000/api/ClosestSentences/';
      const postData = {
        final_score: finalScore
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
        console.log(data)
        setError(null); // Reset error state on successful response
      } else {
        setError(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateSentences,
    responseData,
    loading,
    error,
  };
};

export default useSentenceGeneration;
