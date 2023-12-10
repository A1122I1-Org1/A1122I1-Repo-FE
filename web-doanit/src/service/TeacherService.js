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
    }
}
