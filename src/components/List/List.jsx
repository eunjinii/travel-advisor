import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const placesNum = places?.length;
    const refs = Array(placesNum)
      .fill()
      .map((_, idx) => elRefs[idx] || createRef());

    setElRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="restaurants"> Restaurants </MenuItem>
              <MenuItem value="hotels"> Hotels </MenuItem>
              <MenuItem value="attractions"> Attractions </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="0"> All </MenuItem>
              <MenuItem value="3"> Above 3.0 </MenuItem>
              <MenuItem value="4"> Above 4.0 </MenuItem>
              <MenuItem value="5"> Above 4.5 </MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, idx) => (
              <Grid ref={elRefs[idx]} item key={idx} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={+childClicked === idx}
                  refProp={elRefs[idx]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
