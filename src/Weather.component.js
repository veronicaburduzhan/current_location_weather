import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchWeatherInfo } from "./utils/FetchWeatherInfo";
import { getPosition } from "./utils/GetPosition";
import DateInfo from "./utils/DateInfo";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const Weather = () => {
  const [currentTemp, setCurrentTemp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        try {
          const position = await getPosition();
          const weatherInfo = await fetchWeatherInfo(
            position.coords.latitude,
            position.coords.longitude
          );
          const currentTempreature = weatherInfo.current_weather.temperature;
          console.log(currentTempreature);
          setCurrentTemp(currentTempreature);
          setErrorMssg("");
        } catch {
          setErrorMssg(
            `Oops! To see current temperature you need to give a permission to access your current geolocation.`
          );
        }
      } catch (error) {
        console.log(error);
        setErrorMssg(error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <Card className="text-center cardSize shadow-lg p-3 mb-5 bg-body rounded">
      <Card.Body style={{ color: "#3C4048" }} className="cardContent">
        <Card.Text className="fs-2 text-uppercase">
          <strong>
            <DateInfo />
          </strong>
        </Card.Text>
        {isLoading ? (
          <Card.Text className="fs-4">Loading...</Card.Text>
        ) : (
          <Card.Text className="fs-4">
            {errorMssg ? (
              <Card.Text className="fs-6">{errorMssg}</Card.Text>
            ) : (
              <Card.Text className="fs-4">
                Current temperature is {currentTemp}°C
              </Card.Text>
            )}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Weather;
