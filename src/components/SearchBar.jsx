import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const { setCity, fetchCurrentLocation } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleLocationClick = () => {
    setCity(''); // Clear the city so we use coordinates instead
    fetchCurrentLocation();
  };

  return (
    <div className="w-full max-w-md space-y-2 mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 text-gray-500 hover:text-gray-700"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </form>
      
      <button
        onClick={handleLocationClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <MapPinIcon className="h-4 w-4" />
        Use My Location
      </button>
    </div>
  );
} 