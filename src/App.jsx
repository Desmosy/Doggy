import React, { useState, useEffect } from 'react';
import './App.css';
import BanList from './ban/Ban';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [dogData, setDogData] = useState(null);
  const [banList, setBanList] = useState([]);

  const callAPI = async (query) => {
    try {
      const response = await fetch(query);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const fetchDogData = async () => {
    try {
      const data = await callAPI(`https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}`);
      setDogData({...data[0]}); 
    } catch (error) {
      console.error('Error fetching dog data:', error);
    }
  };
  

  const getRandomDogData = async () => {
    try {
      let newData = null;
      do {
        const data = await callAPI(`https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}`);
        newData = data[0];
      } while (banList.some(attr => newData.breeds.some(breed => breed.name === attr)));
      if (newData) {
        setDogData(newData);
      }
    } catch (error) {
      console.error('No dog data ', error);
    }
  };

  useEffect(() => {
    fetchDogData();
  }, []);

  const handleGetRandomDog = async (e) => {
    e.preventDefault();
    getRandomDogData();
  };

  const handleBanList = (attribute) => {
    setBanList([...banList, attribute]);
  };

  const renderDogData = () => {
    if (!dogData) return null;

    const { url, breeds} = dogData;

    return (
      <div>
        <div className='dog-info'>
          {breeds.map((breed, index) => (
            <div key={index} style={{ display: 'inline-block' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBanList(breed.name);
                }}
              >
                {breed.name}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBanList(breed.life_span);
                }}
              >
                {breed.life_span}
              </button>
                            <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBanList(breed.weight.metric);
                }}
              >
                {breed.weight.metric} lbs
              </button>
            </div>
          ))}
        </div>
        <img className='image' src={url} alt="Dog" style={{ width: '300px', height: '300px' }} />
                <br></br>
        <button className="discover" onClick={handleGetRandomDog}>Discover 🔀</button>
      </div>
    );
  };

  const handleRemoveFromBanList = (attribute) => {
    setBanList(banList.filter(item => item !== attribute));
  };

  return (
    <div className="App">
      <div className="right-column">
        <BanList banList={banList} removeFromBanList={handleRemoveFromBanList} />
      </div>
      <div className="left-column">
        <h1 className='heading'>Dog Dogs and Dogs</h1>
        <h3>You got some dogs in you?</h3>
        <p>🐕🦮🐕‍🦺🐩🦊💀👹</p>
        <div className='dog-pic'>{renderDogData()}</div>
      </div>
    </div>
  );
}

export default App;
