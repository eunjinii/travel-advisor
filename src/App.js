import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({}); // {lat:0, lng:0}
  const [bounds, setBounds] = useState(null); //{ne: { lat: 0, lng: 0 },sw: { lat: 0, lng: 0 },}
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  const fetchPlacesData = async (sw, ne) => {
    const data = await getPlacesData(type, sw, ne);
    setPlaces(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // 브라우저 위치 켬 상태여야 구동 가능
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position?.coords.latitude || 37.36994428541982,
        lng: position?.coords.longitude || 127.10542780571177,
      });
    });
  }, []);

  useEffect(() => {
    if (!bounds) return;
    setIsLoading(true);
    fetchPlacesData(bounds.sw, bounds.ne);
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
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
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
