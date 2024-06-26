// hooks/useSubtitles.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useSubtitles = (srtFile) => {
  const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        const formData = new FormData();
        formData.append('file', srtFile);

        const response = await axios.post('/api/parse-srt', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        setSubtitles(response.data.subtitles);
      } catch (error) {
        console.error('Error fetching subtitles:', error);
      }
    };

    fetchSubtitles();
  }, [srtFile]);

  return { subtitles, currentSubtitle, setCurrentSubtitle };
};

export default useSubtitles;
