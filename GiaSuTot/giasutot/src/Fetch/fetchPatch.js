import axios from "axios";
const fetchPatch = async (url, body) => {
    try {
        const client = axios.create({
            baseURL: url
        });
        client.defaults.withCredentials = true;
        return (await client.patch(url,body)).data;
    } catch (error) {
    }
}
export default fetchPatch;
