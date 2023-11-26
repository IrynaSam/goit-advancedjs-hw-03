import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_NXtFYyIyi6WXrDnJSG1ixW6MQi3wZYfksHpLsoKbmmCpFoezfA46Kb4dRh3yr5Yq';

export async function fetchBreeds() {
  const response = await axios.get('https://api.thecatapi.com/v1/breeds');
  return response.data;
}

export async function fetchCatByBreed(breedId) {
  const response = await axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
  return response.data;
}
