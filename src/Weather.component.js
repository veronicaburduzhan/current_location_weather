import React, { useState, useEffect } from "react";
import "./App.css";

function Weather() {
  const [currentTemp, setCurrentTemp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        (async function () {
          try {
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true`
            );
            if (response.ok) {
              const fetchedWeather = await response.json();
              setCurrentTemp(fetchedWeather.current_weather.temperature);
              setErrorMssg("");
            } else {
              setErrorMssg(
                `Something went wrong! The status is: ${response.status}`
              );
            }
          } catch (error) {
            setErrorMssg(error.message);
            setIsLoading(false);
          } finally {
            setIsLoading(false);
          }
        })();
      },
      function () {
        setErrorMssg(
          `Oops! You need to give a permission to access your current geolocation.`
        );
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <div>
      <p>The weather in your location:</p>
      {isLoading ? <p>Loading...</p> : ""}
      {errorMssg ? <p>{errorMssg}</p> : <p>{currentTemp}°C</p>}
    </div>
  );
}

export default Weather;
