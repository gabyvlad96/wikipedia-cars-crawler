import React, { useEffect, useState } from 'react';
import { Navigation, CarDetails } from './components';
import { baseUrl } from './utils/utils';
import './App.css';


function App() {
  const [cars, setCars] = useState(null);
  const [selectedCarDetails, setSelectedCarDetails] = useState({
    data: null,
  });
  const [fetchingCarsList, setFetchingCarsList] = useState(false);
  const [fetchingCarData, setFetchingCarData] = useState(false);

  const fetchData = async () => {
    setFetchingCarsList(true);
    try {
      const carsResponse = await fetch(`${baseUrl}/getAllCars`);
      if (!carsResponse.ok) throw new Error(`HTTP error! status: ${carsResponse.status}`);
      const cars = await carsResponse.json();
      setCars(cars);
      setFetchingCarsList(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCarDetails = async (carData) => {
    setFetchingCarData(true);
    new Image().src = carData.imageUrl;
    try {
      const carsResponse = await fetch(`${baseUrl}/getCarDetails?url=${encodeURIComponent(carData.modelUrlFull)}`);
      if (!carsResponse.ok) throw new Error(`HTTP error! status: ${carsResponse.status}`);
      const bodyClass = await carsResponse.json();
      setSelectedCarDetails({ data: { ...carData, bodyClass } });
      setFetchingCarData(false);
    } catch (error) {
      console.log(error);
      setSelectedCarDetails({ data: carData });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="header"/>
      <div className="main-container">
        <Navigation data={cars} onItemClick={fetchCarDetails} isLoading={fetchingCarsList}/>
        {(selectedCarDetails.data || fetchingCarData) && <CarDetails car={selectedCarDetails.data} isLoading={fetchingCarData}/>}
      </div>
    </div>
  );
}

export default App;
