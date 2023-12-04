import axios from "axios";

const URL_API = " http://localhost:8080/api/teachers";

export const findAllDegree = async () => {
    try {
        const result = await axios.get(URL_API+"/getAllDegree");
        return result.data;
    } catch (e) {
        console.log(e)
    }
}
