import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

// Move API key to environment variable
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

export function WeatherProvider({ children }) {
  const [city, setCity] = useState(() => localStorage.getItem('lastCity') || '');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState(() => localStorage.getItem('units') || 'metric');

  const fetchWeather = async (searchQuery) => {
    if (!searchQuery) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `${API_BASE_URL}/current.json`, {
          params: {
            key: API_KEY,
            q: searchQuery,
            aqi: 'no'
          }
        }
      );
      
      setWeather(response.data);
      // Only save to localStorage if it's a city search, not coordinates
      if (typeof searchQuery === 'string' && !searchQuery.includes(',')) {
        localStorage.setItem('lastCity', searchQuery);
      }
    } catch (err) {
      setError(
        err.response?.data?.error?.message || 
        'Failed to fetch weather data. Please try again.'
      );
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeather(`${latitude},${longitude}`);
        },
        // Error callback
        (error) => {
          setError('Unable to get your location. Please search for a city instead.');
          setLoading(false);
        },
        // Options
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  // Effect for initial load
  useEffect(() => {
    if (city) {
      fetchWeather(city);
    } else {
      fetchCurrentLocation();
    }
    
    // Set up polling
    const interval = setInterval(() => {
      if (city) {
        fetchWeather(city);
      } else {
        fetchCurrentLocation();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [city]);

  const getTemperature = (temp_c, temp_f) => {
    return units === 'metric' ? temp_c : temp_f;
  };

  return (
    <WeatherContext.Provider 
      value={{ 
        city,
        setCity,
        weather,
        error,
        loading,
        units,
        setUnits,
        getTemperature,
        fetchWeather,
        fetchCurrentLocation
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
} 