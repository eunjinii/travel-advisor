import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
import mapStyles from "./map-styles";

const Map = ({
  coordinates,
  setCoordinates,
  setBounds,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const mapStyle = mapStyles;
  const isArray = (arr) => Array.isArray(arr) && arr.length > 0;

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: 0,
          lng: 0,
        }}
        center={coordinates}
        defaultZoom={14}
        margin={[10, 10, 10, 10]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyle,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {isArray(places) &&
          places.map((place, i) => {
            return (
              <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
              >
                {!isDesktop ? (
                  <LocationOnOutlinedIcon color="primary" fontSize="large" />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography
                      className={classes.typography}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {place.name}
                    </Typography>
                    <img
                      className={classes.pointer}
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                      }
                    />
                    <Rating
                      name="read-only"
                      size="small"
                      value={+place.rating}
                      readOnly
                    />
                  </Paper>
                )}
              </div>
            );
          })}
        {weatherData?.weather?.map((data, idx) => (
          <div
            key={idx}
            lat={weatherData.coord.lat}
            lng={weatherData.coord.lon}
          >
            <img
              src={`https://openweathermap.org/img/w/${data.icon}.png`}
              alt={data.description}
              height="60px"
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
