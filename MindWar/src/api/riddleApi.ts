import axios from "axios";

const BASE_URL = 'https://mind-wars-production-28ae.up.railway.app';

export async function fetchRiddles() {
    try {
        const response = await axios.post(`${BASE_URL}/api/riddle/generate`);
        console.log("Fetched riddle:", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }   
}
    export async function sendGuess(id: number, guess: string) {
        try {
            const response = await axios.post(`${BASE_URL}/api/riddle/${id}/guess`, 
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

