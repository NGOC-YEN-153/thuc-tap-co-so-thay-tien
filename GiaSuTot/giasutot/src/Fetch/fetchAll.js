import axios from "axios";
const fetchGetdf = async (url, listParam) => {
    try {
        const client = axios.create({
            baseURL: url,
            params: listParam
        })
        return (await client.get()).data;
    } catch (error) {
       console.log(error);
    }
}
export default fetchGetdf;