import axios from "axios";

const URL_API = "http://localhost:8080/api/teachers";

export const createTeacher = async (teacherData) => {
    try {
        const response = await axios.post(URL_API+"/createTeacher", teacherData);
        return response.data;
    } catch (error) {
        throw new Error("Error creating teacher: " + error.message);
    }
};
