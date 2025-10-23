import axios from 'axios';

export async function login(username: string, password: string) {
  try {
    const response = await axios.post("http://localhost:8080/api/users/login", {
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
    const response = await axios.post('http://localhost:8080/api/users/createUser',
        { username, password, }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

