import { useWeather } from '../context/WeatherContext';

export default function WeatherDisplay() {
  const { weather, loading, units, setUnits, getTemperature } = useWeather();

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const { current, location } = weather;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{location.name}</h2>
          <p className="text-gray-600">{location.region}, {location.country}</p>
        </div>
        <button
          onClick={toggleUnits}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Switch to {units === 'metric' ? '°F' : '°C'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            className="mx-auto w-16 h-16"
          />
          <p className="text-lg capitalize">{current.condition.text}</p>
        </div>
        <div className="space-y-2">
          <p className="text-4xl font-bold">
            {Math.round(getTemperature(current.temp_c, current.temp_f))}°
            {units === 'metric' ? 'C' : 'F'}
          </p>
          <p>Feels like: {Math.round(getTemperature(current.feelslike_c, current.feelslike_f))}°
            {units === 'metric' ? 'C' : 'F'}
          </p>
          <p>Humidity: {current.humidity}%</p>
          <p>Wind: {units === 'metric' ? 
              `${current.wind_kph} km/h` : 
              `${current.wind_mph} mph`}
          </p>
          <p>Pressure: {current.pressure_mb} mb</p>
          <p>UV Index: {current.uv}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
        <div>
          <p>Visibility: {units === 'metric' ? 
              `${current.vis_km} km` : 
              `${current.vis_miles} miles`}
          </p>
          <p>Cloud Cover: {current.cloud}%</p>
        </div>
        <div>
          <p>Precipitation: {units === 'metric' ? 
              `${current.precip_mm} mm` : 
              `${current.precip_in} in`}
          </p>
          <p>Last Updated: {current.last_updated}</p>
        </div>
      </div>
    </div>
  );
} 