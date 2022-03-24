import axios from "axios";

const baseUrl = "https://travel-advisor.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
  "Content-Type": "application/json",
};

export const getPlacesData = async (sw, ne) => {
  const path = "/restaurants/list-in-boundary";
  try {
    const response = await axios.get(`${baseUrl}${path}`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: sw.lng,
        bl_longitude: ne.lat,
        tr_longitude: ne.lng,
      },
      headers,
    });
    return response.data.data;
  } catch (e) {
    console.error(e);
  }
};