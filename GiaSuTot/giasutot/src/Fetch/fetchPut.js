import axios from "axios";
const fetchPut = async (url, body) => {
    try {
        const client = axios.create({
            baseURL: url
        });
        client.defaults.withCredentials = true;
        return (await client.put(url, body)).data;
    } catch (error) {
    }
}
export default fetchPut;