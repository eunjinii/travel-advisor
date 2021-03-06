import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  const [coordinates, setCoordinates] = useState({}); // {lat:0, lng:0}
  const [bounds, setBounds] = useState({}); //{ne: { lat: 0, lng: 0 },sw: { lat: 0, lng: 0 },}

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [autocomplete, setAutocomplete] = useState(null);

  const fetchPlacesData = async (sw, ne) => {
    const data = await getPlacesData(type, sw, ne);
    const validPlaces =
      data?.filter((place) => place.name && place.num_reviews > 0) ?? [];
    setPlaces(validPlaces);
    setFilteredPlaces([]); // back to non-filtered state
    setIsLoading(false);
  };

  const fetchWeatherData = async (lat, lng) => {
    const data = await getWeatherData(lat, lng);
    setWeatherData(data);
  };

  // happens only when the app starts
  useEffect(() => {
    // 브라우저 위치 켬 상태여야 구동 가능
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position?.coords.latitude,
        lng: position?.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const filteredPlaces =
      places?.filter((place) => place.rating > rating) ?? [];
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (!(bounds.sw && bounds.ne && coordinates.lat && coordinates.lng)) return;

    setIsLoading(true);
    fetchWeatherData(coordinates.lat, coordinates.lng);
    fetchPlacesData(bounds.sw, bounds.ne);
  }, [type, coordinates, bounds]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    console.log({ lat, lng });
    setCoordinates({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating} // not the best practice, react context recommanded
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
