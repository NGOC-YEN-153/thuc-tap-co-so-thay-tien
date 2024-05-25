import axios from "axios";
const fetchGet = async (url, listParam) => {
    try {
        const client = axios.create({
            baseURL: url,
            params: listParam
        });
        client.defaults.withCredentials = true;
        return (await client.get()).data;
    } catch (error) {
        console.log(error); 
    }
}
export default fetchGet;
