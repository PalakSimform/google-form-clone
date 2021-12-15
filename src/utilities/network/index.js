import axios from "axios";
import {BASE_URL} from './config' 
export const GetRequest = async (url) => {
  try {
    const apiResponse = await axios.get(`${BASE_URL}${url}`);
    console.log({ apiResponse });
    const response = apiResponse.status === 200 ? apiResponse.data : {};
    return response;
  } catch (err) {
    return;
  }
};

export const PostRequest = async (url,payload) => {
  try {
    console.log('Url',url,JSON.stringify(payload))
    const apiResponse = await axios.post(`${ADD_URL}${url}`,payload);
    console.log({ apiResponse });
    const response = apiResponse.status === 200 ? apiResponse.data : {};
    return response;
  } catch (err) {
    return;
  }
};