import axios from "axios";

const baseUrl = "http://localhost:8000";

const get = (slug) => {
  console.log("Running GET request to the server.");
  const request = axios.get(`${baseUrl}/api/f/generate/${slug}/`);
  return request.then((response) => {
    return response.data;
  });
};

const createAndAddToSpotify = (mood, tracks, access_token) => {
  const data = { mood, tracks, access_token };
  const request = axios.post(`${baseUrl}/api/add-to-spotify/`, data);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  get,
  createAndAddToSpotify,
};
