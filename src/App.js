import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [temp, setTemp] = useState('');
    const [humidite, setHumidite] = useState('');
    const [ville, setVille] = useState('');
    const [pays, setPays] = useState('');
    const [timezone, setTimezone] = useState('');
    const [description, setDescription] = useState('');
    const [main, setMain] = useState('');
    const [icon, setIcon] = useState('');
    const [tempmin, setTempmin] = useState('');
    const [tempmax, setTempmax] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [isReady, setReady] = useState(false);
    const [latitude, setLatitude] = useState('12.5833'); 
    const [longitude, setLongitude] = useState('-16.2719'); 

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e3261a5fa53f1226df0a3629c61e61ee&units=metric`);
            const data = await response.json();
            setTemp(data.main.temp);
            setHumidite(data.main.humidity);
            setVille(data.name);
            setPays(data.sys.country);
            setTimezone(data.timezone);
            setDescription(data.weather[0].description);
            setMain(data.weather[0].main);
            setIcon(data.weather[0].icon);
            setTempmax(data.main.temp_max);
            setTempmin(data.main.temp_min);
            setSunrise(data.sys.sunrise);
            setSunset(data.sys.sunset);
            setReady(true);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [latitude, longitude]);

    function Myform() {
        const [localLatitude, setLocalLatitude] = useState(latitude);
        const [localLongitude, setLocalLongitude] = useState(longitude);

        function handleSubmit(event) {
            event.preventDefault();
            setLatitude(localLatitude);
            setLongitude(localLongitude);
        }

        return (
            <div className="card align-left" style={{ maxWidth: '540px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="latitude" className="form-label">Latitude</label>
                        <input
                            type="text"
                            className="form-control"
                            id="latitude"
                            onChange={e => setLocalLatitude(e.target.value)}
                            value={localLatitude}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="longitude" className="form-label">Longitude</label>
                        <input
                            type="text"
                            className="form-control"
                            id="longitude"
                            onChange={e => setLocalLongitude(e.target.value)}
                            value={localLongitude}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark">Cliquez</button>
                </form>
            </div>
        );
    }

    const sunriseTime = moment.unix(sunrise);
    const sunsetTime = moment.unix(sunset);

    const getCardClass = (temp) => {
        if (temp <= 10) return "bg-custom-COLD";
        if (temp >= 11 && temp <= 20) return "bg-custom-COOL";
        if (temp >= 21 && temp <= 30) return "bg-custom-WARM";
        if (temp >= 31) return "bg-custom-HOT";
        return "bg-custom-COOL";
    };

    return (
        <div className="App">
            {isReady ? (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark text-white bg-dark mb-3">
                        <a className="navbar-brand" href="#">My Weather App</a>
                    </nav><br/>
                    <div className="row">
                      <div className={`col card ${getCardClass(temp)}`} id="weather">
                          <div className="card-body">
                              <div className="row g-0">
                                  <div className="col-md-3">
                                      <h3>{description}</h3>
                                      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Icône météo" className="img-fluid rounded-start"/>
                                  </div>
                                  <div className="col-md-9 text-left">
                                      <p>Ville : {ville}, {pays}, GMT +{timezone}</p>
                                      <p>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sunrise" viewBox="0 0 16 16">
                                              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                                          </svg>: {sunriseTime.format("HH:mm:ss")}
                                      </p>
                                      <p>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sunset" viewBox="0 0 16 16">
                                              <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                                          </svg> : {sunsetTime.format("HH:mm:ss")}
                                      </p>
                                      <p>Main : {main}</p>
                                      <p>Température : {temp}°C Humidite : {humidite}%</p>
                                      <p>Température Maximal : {tempmax}°C</p>
                                      <p>Température Minimal : {tempmin}°C</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col">
                          <nav className="navbar navbar-expand-lg navbar-dark text-white bg-dark mb-3">
                              <a className="navbar-brand" href="#">Coordone !</a>
                          </nav><br/>
                          <div className="row align-items-center">
                              <div className='col'></div>
                              <Myform />
                              <div className='col'></div>
                          </div>
                      </div>
                    </div>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
}

export default App;
