import axios from "axios";

const URL_API = "http://localhost:8080/api/teachers";

export const createTeacher = async (teacherData) => {
    try {
        await axios.post(URL_API + "/createTeacher", teacherData);
        return null;
    } catch (error) {
        return error.response.data;
    }
};
<<<<<<< HEAD


export const getTeacherById = async (teacherId) => {
        const response = await axios.get(URL_API + "/getTeacherById/" + teacherId);
        return response.data; ;

}
export const updateTeacher = async (item) => {
    try {
        await axios.post(URL_API + "/updateTeacher", item)
        return null;
    } catch (error) {
        return error.response.data;
=======
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
>>>>>>> e75b127199cf504bed09cab3650c1f082754dd80
    }
}
