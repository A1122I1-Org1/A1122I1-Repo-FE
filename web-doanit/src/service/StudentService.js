import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
const STUDENT_LIST_API = "student-list";
const STUDENT_LIST_TEACHER_API = "student-list-teacher/";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZWFjaGVyIiwiaWF0IjoxNzAxNzYxODMxLCJleHAiOjE3MDE4NDgyMzF9.TbFhQPVFfdIGKtjxDp5kdqvhdmUEcOedLIssZRx5QjJfmYJLsCJ8XYgdOcZHUeaYQx25xGJa8qLlkUnYFxlmCw";

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