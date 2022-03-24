import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({
    lat: 42.37010356647633,
    lng: -71.03982543945315,
  });
  const [bounds, setBounds] = useState({
    ne: { lat: 42.39045562314777, lng: -71.01124382019046 },
    sw: { lat: 42.34974491335828, lng: -71.06840705871585 },
  }); // 현재 브라우저 위치설정 끔 상태이기 때문에 초기값 설정

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log("lat lng", latitude, longitude);
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    async function fetchPlacesData(sw, ne) {
      const data = await getPlacesData(sw, ne);
      //   console.log(coordinates, bounds);
      setPlaces(data);
    }
    fetchPlacesData(bounds.sw, bounds.ne);
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
