import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export async function fetchRiddles() {
    try {
        const response = await axios.post(`${BASE_URL}/riddle/generate`);
        console.log("Fetched riddle:", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }   
}
    export async function sendGuess(id: number, guess: string) {
        try {
            const response = await axios.post(`${BASE_URL}/riddle/${id}/guess`, 
                { guess }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }       

        }

