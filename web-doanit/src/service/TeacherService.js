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
export const getAllTeacher = async (find, page) => {
    try {
        const response = await axios.get(`${URL_API}/list?find=${find}&page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error("Error getting teacher: " + error.message);
    }
}
export const deleteTeacher = async (id) => {
    try {
        const response = await axios.delete(`${URL_API}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error deleting teacher: " + error.message);
    }
}
