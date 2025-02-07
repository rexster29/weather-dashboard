import { WeatherProvider } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorMessage from './components/ErrorMessage';

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Weather Dashboard
          </h1>
          <SearchBar />
          <ErrorMessage />
          <WeatherDisplay />
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App; 