import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
  try {
    const response = await axios.get(url, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
      },
    });
    return response.data.data;
  } catch (e) {
    console.error(e);
  }
};

export const getWeatherData = async (lat, lng) => {
  const url = `https://community-open-weather-map.p.rapidapi.com/weather`;
  try {
    if (!(lat && lng)) return;
    const response = await axios.get(url, {
      params: { lon: lng, lat },
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
