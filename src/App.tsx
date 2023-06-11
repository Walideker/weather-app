import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudSunRain, faCoffee } from '@fortawesome/free-solid-svg-icons';



function App() {
  const [search, setSearch] = useState('')


  interface weatherData {
    name: string;
    main: {
      temp: string;
      humidity: number;
    }
    sys: any;
    weather: any;
    wind: {
      speed: number;
      deg: number;
    };
  }
  const [weather, setWeather] = useState<weatherData>()

  const api = {
    key: '7f6bbe9477a0d744fae41d51d0688ce1',
    base: 'https://api.openweathermap.org/data/2.5/'
  }

  const searched = () => {
    if(search ===''){
      alert('Please enter a location')
    }
    else{
    
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then((result) => {
        if (result.cod === '404') {
          alert('Location not found');
        } else {
          setWeather(result);
        }
      })
      .catch(error => {
        console.log(error);
      })}
  }
  return (
    <div className="">
      <nav className='navbar navbar-expand   '>
        <div className='navbar-brand m-3 '><FontAwesomeIcon icon={faCloud} size='lg' /></div>
      </nav>
      <input type="text" onChange={(e) => setSearch(e.target.value)}
        className='input-success mt-5 input' placeholder='search...' />
      <button className=' ' onClick={searched}>search</button>
      <div>
        {weather && typeof weather === 'object' && (
          <div className='mt-3'>
            <p>location : {weather.sys.country} {weather.name}</p>
            <p>tempurature :  {weather.main.temp} °C</p>
            <p>Humidity : {weather.main.humidity} %</p>
            <p>Wind Speed : {weather.wind.speed} m/s</p>
            <p>wind direction : {weather.wind.deg} °</p>
            <p>description :  {weather.weather[0].main} {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
