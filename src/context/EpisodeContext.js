import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the episode ID
const EpisodeContext = createContext();

export const useEpisode = () => {
  return useContext(EpisodeContext);
};

export const EpisodeProvider = ({ children }) => {
  const [episodeId, setEpisodeId] = useState(null);
  const [mediaId, setMediaId] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');


  useEffect(() => {
    if (episodeId && mediaId && selectedServer) {
      fetchEpisodeDetails(episodeId, mediaId, selectedServer);
    }
  }, [episodeId, mediaId, selectedServer]);

  const fetchEpisodeDetails = async (episodeId, mediaId, selectedServer) => {
    setLoading(true);
    setError(null);
    //const url = "https://luffy-server-production.up.railway.app/watch";
    const testurl = "http://localhost:8080/watch";
    try {
      const response = await fetch(testurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ episodeId, mediaId, selectedServer })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if(data.success){
        console.log("Success");
      }
      console.log(data);
      setPlayerData(data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EpisodeContext.Provider value={{ 
      episodeId, 
      setEpisodeId, 
      mediaId, 
      setMediaId, 
      selectedServer, 
      setSelectedServer, 
      playerData,
      search,
      setSearch,
      loading,
      error
      }}>
      {children}
    </EpisodeContext.Provider>
  );
};
