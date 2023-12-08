import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
const STUDENT_LIST_API = "student-list";
const STUDENT_LIST_TEACHER_API = "student-list-teacher/";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZWFjaGVyIiwiaWF0IjoxNzAxOTA3MjM1LCJleHAiOjE3MDE5OTM2MzV9.ypmkKWJvoyt4Dwp25WWJ4LjONd-KUx2fuzgqHBwBdTriSp5kln-b_YiWGukYjKFWbNA0icGtCytXQPoORPISzA";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

export const findAll = async (pageNumber, searchKey) => {
    try {
        const result = await axiosInstance.get(`${STUDENT_LIST_API}?page=${pageNumber}&find=${searchKey}`);
        console.log(result.data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e; // Re-throw the error to handle it at the caller's level
    }
};

export const findAllWithTeacher = async (pageNumber, searchKey) => {
    try {
        const result = await axiosInstance.get(`${STUDENT_LIST_TEACHER_API}?page=${pageNumber}&find=${searchKey}`);
        console.log(result.data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e; // Re-throw the error to handle it at the caller's level
    }
};

export const save = async (value) => {
    try {
        await axios.post(URL + "create-student", value)
    } catch (e) {
        console.log(e)
    }
}

export const findById = async () => {
    try {
        const studentId = 9;
        const res = await axios.get(URL + "get-student-by-studentId/" + studentId);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export const update = async (item) => {
    try {
        const res = await axios.put(URL + "edit-student" , item);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
