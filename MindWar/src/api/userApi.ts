import axios from 'axios';

const BASE_URL = 'https://mind-wars-production-28ae.up.railway.app';

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, {
      username,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

export async function register(username: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/createUser`,
        { username, password, }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


