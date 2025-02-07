import { useWeather } from '../context/WeatherContext';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function ErrorMessage() {
  const { error } = useWeather();

  if (!error) return null;

  return (
    <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-2">
      <XCircleIcon className="h-5 w-5 text-red-500" />
      <p className="text-red-700">{error}</p>
    </div>
  );
} 